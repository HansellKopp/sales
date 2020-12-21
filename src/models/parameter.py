import os
import json
from pathlib import Path
from . import db
from .document import Document
from sqlalchemy import desc, asc, or_
from sqlalchemy.event import listen
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey
from sqlalchemy.event import listen



class Parameter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    tax_id = db.Column(db.String, nullable=False)
    exchange = db.Column(db.Float, nullable=False, default=0)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    last_invoice = db.Column(db.Integer, nullable=False, default=0)

    @classmethod
    def new(cls, tax_id, exchange, name, address, last_invoice):
        return Parameter(tax_id=tax_id,exchange=exchange,name=name,address=address,last_invoice=last_invoice)

    @classmethod
    def get_by_page(cls, order, page, per_page=10, q=""):
        sort = desc(Parameter.id) if order == 'desc' else asc(Parameter.id)
        parameter_query = Parameter.query
        if(q):
            parameter_query = parameter_query.filter(or_(Parameter.firstname.like(
                '%'+q+'%'), Parameter.name.like('%'+q+'%')))
        parameter_query = parameter_query.order_by(sort).paginate(page, per_page)
        return parameter_query.items

    @classmethod
    def get_first(cls):
        return Parameter.query.first()

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except BaseException as e:
            print(e)
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except:
            return False

    def __str__(self):
        return "<Parameter (tax_id=%s name=%s)>" % (self.tax_id, self.name)

def insert_parameters(*args, **kwargs):
    script_dir = os.path.dirname(__file__)
    path = Path(script_dir)
    rel_path = "mockups/parameters.json"
    abs_file_path = os.path.join(path.parent, rel_path)
    with open(abs_file_path, 'r', encoding='utf-8') as data_file:
        data=data_file.read()
        records = json.loads(data)
        for record in records:
            db.session.add(Parameter(
                exchange=record['exchange'],
                tax_id=record['tax_id'],
                name=record['name'],
                address=record['address'],
                last_invoice=record['last_invoice'],
            ))
            try:
                db.session.commit()
            except:
                db.session.rollback()


listen(Parameter.__table__, 'after_create', insert_parameters)