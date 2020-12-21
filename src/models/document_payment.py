from . import db
from models.document import Document
from sqlalchemy import desc, asc
from sqlalchemy.event import listen
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class DocumentPayment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    amount = db.Column(db.Float, nullable=False, default=0)
    exchange = db.Column(db.Float, nullable=False, default=0)
    payment_type = db.Column(db.String, nullable=False, default="")
    details = db.Column(db.String, nullable=False, default="")

    document_id = db.Column(db.Integer, db.ForeignKey(Document.id))

    @classmethod
    def new(cls, amount=amount, exchange=exchange, payment_type=payment_type,
            details=details, document_id=document_id):
        return DocumentPayment(amount=amount, exchange=exchange, 
            payment_type=payment_type, details=details, document_id=document_id
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
        return '<DocumentPayment (sku=%r, description=%r, quantity=%r) >' % self.sku, self.description, self.quantity
