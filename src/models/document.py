from . import db
from datetime import datetime
from sqlalchemy import desc, asc
from sqlalchemy.event import listen
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    number = db.Column(db.Integer, nullable=False)
    document_type = db.Column(db.String, nullable=False, default="")
    date = db.Column(db.DateTime(), nullable=False,
                     default=db.func.current_timestamp())
    sub_total = db.Column(db.Float, nullable=False, default=0)
    discount = db.Column(db.Float, nullable=False, default=True)
    tax = db.Column(db.Float, nullable=False, default=0)
    total = db.Column(db.Float, nullable=False, default="")
    exchange = db.Column(db.Float, nullable=False, default="")
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'), nullable=False)
    details = db.relationship('DocumentDetail', backref='document', lazy=True)
    payments = db.relationship('DocumentPayment', backref='document', lazy=True)


    @classmethod
    def new(cls, person_id, number=number, date=date, document_type=document_type,
            sub_total=sub_total, discount=discount, tax=tax, total=total, exchange=exchange):
        docu = Document(
            person_id=person_id,
            number=number,
            date=date,
            document_type=document_type,
            sub_total=sub_total,
            discount=discount,
            tax=tax,
            total=total,
            exchange=exchange
        )
        return docu

    @classmethod
    def get_by_page(cls, order, page, per_page=10):
        sort = desc(Document.number) if order == 'desc' else asc(
            Document.number)
        return Document.query.order_by(sort).paginate(page, per_page).items

    @classmethod
    def get_by_dates(cls, document_type, date_from, date_to):
        sort = asc(Document.number)
        query = Document.query\
            .filter(Document.date >= date_from)\
            .filter(Document.date <= date_to)\
            .filter(Document.document_type == document_type)
        return query.order_by(sort).all()

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except:
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except:
            return False

    def __str__(self):
        return '<Document (number=%r, date=%r, document_type=document_type) >' % self.number, self.date, self.document_type
