import os
import json
from pathlib import Path
from . import db
from .document import Document
from sqlalchemy import desc, asc, or_
from sqlalchemy.event import listen
from sqlalchemy.orm import relationship
from schemas.person import params_person_schema


class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=True)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=True)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=True)
    tax_id = db.Column(db.String, nullable=False)
    person_type = db.Column(db.String, nullable=False)
    extern = db.Column(db.Boolean, nullable=False, default=False)
    document = db.relationship('Document', backref='person', lazy=True)

    @classmethod
    def new(cls, tax_id, firstname, lastname, address, city, phone, email, person_type, extern):
        return Person(tax_id=tax_id, firstname=firstname, lastname=lastname, address=address,
                      city=city, phone=phone, email=email, person_type=person_type, extern=extern)

    @classmethod
    def get_by_page(cls, order, page, per_page=10, q="", person_type=""):
        sort = desc(Person.id) if order == 'desc' else asc(Person.id)
        person_query = Person.query
        if(person_type):
            person_query = person_query.filter(Person.person_type == person_type)
        if(q):
            person_query = person_query.filter(or_(Person.firstname.like(
                '%'+q+'%'), Person.lastname.like('%'+q+'%'), Person.tax_id.like('%'+q+'%')))
        person_query = person_query.order_by(sort).paginate(page, per_page)
        return person_query.items

    @classmethod
    def get_by_tax_id(cls, tax_id=""):
        return Person.query.filter_by(tax_id=tax_id).first()

    @classmethod
    def search(cls, q="", person_type=""):
        person_query = Person.query
        if(person_type):
            person_query = person_query.filter(Person.person_type == person_type)
        if(q):
            person_query = person_query.filter(or_(Person.firstname.like(
                '%'+q+'%'), Person.lastname.like('%'+q+'%'), Person.tax_id.like('%'+q+'%')))
        sort = asc(Person.id)
        person_query = person_query.order_by(sort)
        person_query = person_query.limit(5)
        return person_query.all()

    ## create or update person
    @classmethod
    def new_or_update(cls, new_person):
        error = params_person_schema.validate(new_person)
        if error:
            return error
        person=Person.get_by_tax_id(new_person['tax_id'])
        if (person == None):
            person = cls.new(
                firstname=new_person.get('firstname'),
                tax_id=new_person.get('tax_id'),
                address=new_person.get('address'),
                city=new_person.get('city'),
                email=new_person.get('email', ''),
                phone= new_person.get('phone', ''),
                lastname=new_person.get('lastname', ''),
                person_type=new_person.get('person_type', 'client'),
                extern=new_person.get('extern', False)
            )
        else:            
            person.firstname=new_person.get('firstname', person.firstname)
            # person.tax_id=new_person.get('tax_id', person.tax_id)
            person.address=new_person.get('address',person.address)
            person.city=new_person.get('city',person.city)
            person.email=new_person.get('email',person.email)
            person.phone= new_person.get('phone',person.phone)
            person.lastname=new_person.get('lastname',person.lastname)
            person.person_type=new_person.get('person_type',person.person_type)
            person.extern=new_person.get('extern',person.extern)
        return person

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
        return "<Person(tax_id=%s firstname=%s lastname=%s)>" % (self.tax_id, self.firstname, self.lastname)

def insert_Persons(*args, **kwargs):
    script_dir = os.path.dirname(__file__)
    path = Path(script_dir)
    rel_path = "mockups/persons.json"
    abs_file_path = os.path.join(path.parent, rel_path)
    with open(abs_file_path, 'r', encoding='utf-8') as data_file:
        data=data_file.read()
        records = json.loads(data)
        for record in records:
            db.session.add(Person(
                tax_id=record['tax_id'],
                firstname=record['firstname'],
                lastname=record['lastname'],
                address=record['address'],
                city=record['city'],
                phone=record['phone'],
                email=record['email'],
                person_type=record['person_type'],
                extern=record['extern'],
            ))
            try:
                db.session.commit()
            except BaseException as e:
                print(e)
                db.session.rollback()


listen(Person.__table__, 'after_create', insert_Persons)

Person.documents = relationship(
    "Document", order_by=Document.id, back_populates="person")
