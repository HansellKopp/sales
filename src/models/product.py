import os
import json
from pathlib import Path
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
    stock = db.Column(db.Float, nullable=False, default=0)  # calc
    minimum = db.Column(db.Float, nullable=False, default=0)
    departament = db.Column(db.String, nullable=False, default=True)
    
    @classmethod
    def new(cls, sku, description, tax, cost, price, price_2, price_3, stock, minimum,
            departament):
        return Product(
            sku=sku,
            description=description,
            tax=tax,
            cost=cost,
            price=price,
            price_2=price_2,
            price_3=price_3,
            stock=stock,
            minimum=minimum,
            departament=departament,
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
    script_dir = os.path.dirname(__file__)
    path = Path(script_dir)
    rel_path = "mockups/products.json"
    abs_file_path = os.path.join(path.parent, rel_path)
    with open(abs_file_path, 'r') as data_file:
        data=data_file.read()
        records = json.loads(data)
        for record in records:
            db.session.add(Product(
                departament=record['departament'],
                sku=record['sku'],
                description=record['description'],
                tax=0.16,
                cost=0,
                stock=0,
                minimum=0,
                price=record['price'],
                price_2=record['price_2'],
                price_3=record['price_3'],
            ))
            try:
                db.session.commit()
            except:
                db.session.rollback()


listen(Product.__table__, 'after_create', insert_Products)
