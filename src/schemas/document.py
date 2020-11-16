from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range

from .person import PersonSchema
from .product import ProductSchema
from .payment import PaymentSchema

class DocumentSchema(Schema):
    class Meta:
        fields = ('id', 'number', 'date',
                  'document_type', 'sub_total', 'discount', 'tax', 'total',
                  'exchange_rate', 'person_id')


class ParamsDocumentSchema(Schema):
    person = fields.Nested(PersonSchema)
    products = fields.Nested(ProductSchema)
    payments = fields.Nested(PaymentSchema)

document_schema = DocumentSchema()
documents_schema = DocumentSchema(many=True)

params_document_schema = ParamsDocumentSchema()
