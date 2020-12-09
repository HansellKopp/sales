
from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range


class ProductSchema(Schema):
    class Meta:
        fields = ('id', 'sku', 'description', 'tax', 'cost','price','price_2','price_3', 'stock'
                 ,'minimum','departament', 'stock','updated_at')

class ParamsProductSchema(Schema):
    # sku = fields.Str(required=True, validate=Length(max=50))
    description = fields.Str(required=True, validate=Length(max=150))
    tax = fields.Float(required=True, validate=Range(
        min_inclusive=0, max_inclusive=100))
    # cost = fields.Float(required=True, validate=Range(min_inclusive=0))
    price = fields.Float(required=True, validate=Range(min_inclusive=0))
    price_2 = fields.Float(required=True, validate=Range(min_inclusive=0))
    price_3 = fields.Float(required=True, validate=Range(min_inclusive=0))
    stock = fields.Float(required=True, default=0)
    minimum = fields.Float(required=True, validate=Range(min_inclusive=0))
    departament = fields.Str(required=True, validate=Length(max=50))

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

params_product_schema = ParamsProductSchema()
