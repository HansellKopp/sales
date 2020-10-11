from . import db
from .document import Document
from sqlalchemy import desc, asc, or_
from sqlalchemy.event import listen
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey


class Offer(db.Model):
    __tablename__ = 'offers'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    description = db.Column(db.String, nullable=False)
    cost = db.Column(db.Float, nullable=False, default=0)
    price = db.Column(db.Float, nullable=False, default=0)
    quantity = db.Column(db.Float, nullable=False, default=0)
    starts_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    ends_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    product_id = db.Column(db.Integer, ForeignKey('products.id'))

    @classmethod
    def new(cls, description, cost, price, quantity, starts_at, ends_at, product_id):
        return Offer(description=description,cost=cost,price=price,quantity=quantity,starts_at=starts_at,ends_at=ends_at,product_id=product_id)

    @classmethod
    def get_by_page(cls, order, page, per_page=10, q=""):
        sort = desc(Offer.id) if order == 'desc' else asc(Offer.id)
        offer_query = Offer.query
        if(q):
            offer_query = offer_query.filter(or_(Offer.firstname.like(
                '%'+q+'%'), Offer.description.like('%'+q+'%')))
        offer_query = offer_query.order_by(sort).paginate(page, per_page)
        return offer_query.items

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except BaseException as e:
            print(e)
            logger.error('Failed to do something: ' + str(e))
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except:
            return False

    def __str__(self):
        return "<Offer(description=%s price=%s)>" % (self.description, self.price)