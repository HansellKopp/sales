from flask import request

from flask import Blueprint

from .response import response, not_found, bad_request

from models.product import Product

from schemas.product import product_schema
from schemas.product import products_schema
from schemas.product import params_product_schema

PRODUCTS_BLUEPRINT = Blueprint('products', __name__, url_prefix='/api/v1')

def set_product(function):
    def wrap(*args, **kwargs):
        id = kwargs.get('id', 0)
        product = Product.query.filter_by(id=id).first()
        if product is None:
            return not_found()

        return function(product)
    
    wrap.__name__ = function.__name__
    return wrap

@PRODUCTS_BLUEPRINT.route('/products', methods=['GET'])
def get_products():
    page = int(request.args.get('page', 1))
    order = request.args.get('order', 'desc')
    
    products = Product.get_by_page(order, page)

    return response(products_schema.dump(products))


@PRODUCTS_BLUEPRINT.route('/products/<id>', methods=['GET'])
@set_product
def get_product(product):
    return response(product_schema.dump(product))

@PRODUCTS_BLUEPRINT.route('/products', methods=['POST'])
def create_product():
    json = request.get_json(force=True)
    error = params_product_schema.validate(json)

    if error:
        return bad_request()

    product = Product.new(
        sku=json['sku'], 
        description=json['description'],
        tax=json['tax'], 
        price=json['price'], 
        departament=json['departament'], 
        stock=json['stock'],
        unit=json['unit']
    )

    if product.save():
        return response(product_schema.dump(product))
    
    return bad_request()

@PRODUCTS_BLUEPRINT.route('/products/<id>', methods=['PUT'])
@set_product
def update_product(product):
    json = request.get_json(force=True)

    product.sku = json.get('sku', product.sku)
    product.description = json.get('description', product.description)
    product.tax = json.get('tax', product.tax)
    product.price = json.get('price', product.price)
    product.departament = json.get('departament', product.departament)
    product.stock = json.get('stock', product.stock)
    product.unit = json.get('unit', product.unit)

    if product.save():
        return response(product_schema.dump(product))

    return bad_request()

@PRODUCTS_BLUEPRINT.route('/products/<id>', methods=['DELETE'])
@set_product
def delete_product(product):
    if product.delete():
        return response(product_schema.dump(product))
    
    return bad_request()