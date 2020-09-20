
from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range

class ProductSchema(Schema):
    class Meta:
        fields = ('sku','description', 'tax', 'price','departament','stock','unit')

class ParamsProductSchema(Schema):
    sku = fields.Str(required=True, validate=Length(max=50))
    description = fields.Str(required=True, validate=Length(max=150))
    tax = fields.Float(required=True, validate=Range(min_inclusive=0, max_inclusive=100))
    price = fields.Float(required=True, validate=Range(min_inclusive=0))
    departament = fields.Str(required=True, validate=Length(max=50))
    stock = fields.Float(required=True,default=0) ## todo , validate=Range(min_inclusive=0)
    unit = fields.Str(required=True, validate=Length(max=50))

product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

params_product_schema = ParamsProductSchema()