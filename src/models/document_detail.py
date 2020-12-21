from . import db
from models.product import Product
from models.document import Document
from sqlalchemy import desc, asc
from sqlalchemy.event import listen
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class DocumentDetail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    cost = db.Column(db.Float, nullable=False, default=0)
    price = db.Column(db.Float, nullable=False, default=0)
    quantity = db.Column(db.Float, nullable=False, default=0)
    sku = db.Column(db.Float, nullable=False, default=0)
    tax = db.Column(db.Float, nullable=False, default=0)
    departament = db.Column(db.String, nullable=False, default="")
    description = db.Column(db.String, nullable=False, default="")

    product_id = db.Column(db.Integer, db.ForeignKey(Product.id))
    document_id = db.Column(db.Integer, db.ForeignKey(Document.id))

    @classmethod
    def new(cls, cost=cost, price=price, quantity=quantity, sku=sku,
        departament=departament, tax=tax, description=description,
        product_id=product_id, document_id=document_id):
        return DocumentDetail(
            cost=cost,
            price=price,
            quantity=quantity,
            sku=sku,
            tax=tax,
            departament=departament,
            description=description,
            product_id=product_id
        )

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
        return '<DocumentDetail (sku=%r, description=%r, quantity=%r) >' % self.sku, self.description, self.quantity
