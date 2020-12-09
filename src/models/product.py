import os
import json
from datetime import datetime
from pathlib import Path
from sqlalchemy import func 
from sqlalchemy import desc, asc
from sqlalchemy.event import listen
from . import db
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
    updated_at = db.Column(db.DateTime(), nullable=False, 
                          default=db.func.current_timestamp())
    deleted_at = db.Column(db.DateTime(), nullable=True)
    
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
        product_query = Product.query.filter_by(Product.deleted_at==None)
        return product_query.order_by(sort).paginate(page, per_page).items

    @classmethod
    def get_all(cls, order):
        sort = desc(Product.description) if order == 'desc' else asc(
            Product.description)
        product_query = Product.query.filter_by(deleted_at=None)
        return product_query.order_by(sort).all()

    def save(self):
        try:
            self.updated_at=datetime.now()
            if(self.sku is None):                
                max_sku=db.session.query(func.max(Product.sku)).first()
                if(max_sku is None):
                    self.sku=0
                else:
                    self.sku=int(max_sku[0] if max_sku[0] is not None else 0) + 1
            db.session.add(self)
            db.session.commit()
            return True
        except RuntimeError:
            print(RuntimeError)
            return False

    def delete(self):
        try:
            self.deleted_at=datetime.now()
            # db.session.delete(self)
            db.session.add(self)
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
    with open(abs_file_path, 'r', encoding='utf-8') as data_file:
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
