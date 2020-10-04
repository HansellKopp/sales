from . import db
from sqlalchemy import desc, asc
from sqlalchemy.event import listen
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship


class DocumentDetail(db.Model):
    __tablename__ = 'document_details'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime(), nullable=False,
                     default=db.func.current_timestamp())
    document_type = db.Column(db.Float, nullable=False, default=0)
    sub_total = db.Column(db.Float, nullable=False, default=0)
    discount = db.Column(db.String, nullable=False, default=True)
    tax = db.Column(db.Float, nullable=False, default=0)
    total = db.Column(db.String, nullable=False, default="")

    document_id = db.Column(db.Integer, ForeignKey('document.id'))
    document = relationship("Document", back_populates="document_details")

    document_id = db.Column(db.Integer, ForeignKey('document.id'))
    document = relationship("Document", back_populates="document_details")

    @classmethod
    def new(cls, person, number=number, date=date, document_type=document_type, sub_total=sub_total, discount=discount, tax=tax, total=total):
        return Document(
            person=person,
            number=number,
            date=date,
            document_type=document_type,
            sub_total=sub_total,
            discount=discount,
            tax=tax,
            total=total,
        )

    @classmethod
    def get_by_page(cls, order, page, per_page=10):
        sort = desc(Document.number) if order == 'desc' else asc(
            Document.number)
        return Document.query.order_by(sort).paginate(page, per_page).items

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
