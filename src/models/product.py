from . import db
from sqlalchemy import desc, asc
from sqlalchemy.event import listen


class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(), nullable=False,
                           default=db.func.current_timestamp())
    sku = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    tax = db.Column(db.Float, nullable=False, default=0)
    cost = db.Column(db.Float, nullable=False, default=0)
    price = db.Column(db.Float, nullable=False, default=0)
    price_2 = db.Column(db.Float, nullable=False, default=0)
    price_3 = db.Column(db.Float, nullable=False, default=0)
    price_4 = db.Column(db.Float, nullable=False, default=0)
    stock = db.Column(db.Float, nullable=False, default=0)  # calc
    minimum = db.Column(db.Float, nullable=False, default=0)
    departament = db.Column(db.String, nullable=False, default=True)
    unit = db.Column(db.String, nullable=False, default="")

    @classmethod
    def new(cls, sku, description, tax, cost, price, price_2, price_3, price_4, stock, minimum,
            departament, unit):
        return Product(
            sku=sku,
            description=description,
            tax=tax,
            cost=cost,
            price=price,
            price_2=price_2,
            price_3=price_3,
            price_4=price_4,
            stock=stock,
            minimum=minimum,
            departament=departament,
            unit=unit
        )

    @classmethod
    def get_by_page(cls, order, page, per_page=10):
        sort = desc(Product.description) if order == 'desc' else asc(
            Product.description)
        return Product.query.order_by(sort).paginate(page, per_page).items

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
        return '<Product %r>' % self.description


def insert_Products(*args, **kwargs):
    pass
    # db.session.add(
    #    Product(email='admin@sales.com', password='password', active=True)
    # )
    # db.session.commit()


listen(Product.__table__, 'after_create', insert_Products)
