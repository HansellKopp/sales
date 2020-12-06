from . import db
from sqlalchemy import desc, asc
from sqlalchemy.event import listen
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    number = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime(), nullable=False,
                     default=db.func.current_timestamp())
    document_type = db.Column(db.Float, nullable=False, default=0)
    sub_total = db.Column(db.Float, nullable=False, default=0)
    discount = db.Column(db.String, nullable=False, default=True)
    tax = db.Column(db.Float, nullable=False, default=0)
    total = db.Column(db.String, nullable=False, default="")
    exchange_rate = db.Column(db.String, nullable=False, default="")
    person_id = db.Column(db.Integer, db.ForeignKey('person.id'),
        nullable=False)
    products = db.relationship('DocumentProduct', backref='document', lazy=True)
    payments = db.relationship('DocumentPayment', backref='document', lazy=True)


    @classmethod
    def new(cls, person_id, number=number, date=date, document_type=document_type,
            sub_total=sub_total, discount=discount, tax=tax, total=total, exchange_rate=exchange_rate):
        docu = Document(
            person_id=person_id,
            number=number,
            date=date,
            document_type=document_type,
            sub_total=sub_total,
            discount=discount,
            tax=tax,
            total=total,
            exchange_rate=exchange_rate
        )
        return docu

    @classmethod
    def get_by_page(cls, order, page, per_page=10):
        sort = desc(Document.number) if order == 'desc' else asc(
            Document.number)
        return Document.query.order_by(sort).paginate(page, per_page).items

    @classmethod
    def new_invoice(cls, data):
        ## update or create person
        new_person = json['person']
        person=Person.get_by_tax_id(new_person['tax_id'])
        if (person == None):
            error = person_schema.validate(new_person)
            if error:
                return error #bad_request()
            person = Person.new(
                firstname=new_person['firstname'],
                tax_id=new_person['tax_id'],
                address=new_person['address'],
                city=new_person['city'],
                email=new_person.get('email', ''),
                phone= new_person.get('phone', ''),
                lastname=new_person.get('lastname', '')
                )
            if not person.save():
                return response({
                    "message": "Error unable to save person"
                })
            ## return response(person_schema.dump(person))

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
        return '<Document (number=%r, date=%r, document_type=document_type) >' % self.number, self.date, document_type

class DocumentProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cost = db.Column(db.Float, nullable=False, default=0)
    sku = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False, default=0)
    quantity = db.Column(db.Float, nullable=False, default=0)
    document_id = db.Column(db.Integer, db.ForeignKey('document.id'),
        nullable=False)

class DocumentPayment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ammount = db.Column(db.Float, nullable=False, default=0)
    ammountBs = db.Column(db.Float, nullable=False, default=0)
    paymentType = db.Column(db.String, nullable=False)
    details = db.Column(db.String, nullable=False)
    document_id = db.Column(db.Integer, db.ForeignKey('document.id'),
        nullable=False)