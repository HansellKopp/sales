from . import db
from .document import Document
from sqlalchemy import desc, asc, or_
from sqlalchemy.event import listen
from sqlalchemy.orm import relationship


class Person(db.Model):
    __tablename__ = 'persons'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=True)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=True)
    state = db.Column(db.String, nullable=True)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=True)
    tax_id = db.Column(db.String, nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)
    price = db.Column(db.Integer, nullable=False, default=1)

    @classmethod
    def new(cls, tax_id, firstname, lastname, address, city, state, phone, email, price):
        return Person(tax_id=tax_id, firstname=firstname, lastname=lastname, address=address,
                      city=city, state=state, phone=phone, email=email, price=1)

    @classmethod
    def get_by_page(cls, order, page, per_page=10, q=""):
        sort = desc(Person.id) if order == 'desc' else asc(Person.id)
        person_query = Person.query
        if(q):
            person_query = person_query.filter(or_(Person.firstname.like(
                '%'+q+'%'), Person.lastname.like('%'+q+'%'), Person.tax_id.like('%'+q+'%')))
        person_query = person_query.order_by(sort).paginate(page, per_page)
        return person_query.items

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


Person.documents = relationship(
    "Document", order_by=Document.id, back_populates="person")
