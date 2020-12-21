
from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range


class OfferSchema(Schema):
    class Meta:
        fields = ('id', 'description','cost',
                  'price', 'tax', 'quantity', 
                  'starts_at', 'ends_at',
                  'departament','product_id')
class ParamsOfferSchema(Schema):
    product_id = fields.Integer(required=False)
    departament = fields.Str(required=True, validate=Length(max=150))
    description = fields.Str(required=True, validate=Length(max=150))
    cost = fields.Float(required=True, validate=Range(min_inclusive=0))
    tax = fields.Float(required=True, validate=Range(min_inclusive=0))
    price = fields.Float(required=True, validate=Range(min_inclusive=0))
    quantity = fields.Float(required=True, validate=Range(min_inclusive=0))
    starts_at = fields.Date(required=True)
    ends_at = fields.Date(required=True)


offer_schema = OfferSchema()
offers_schema = OfferSchema(many=True)

params_offer_schema = ParamsOfferSchema()
