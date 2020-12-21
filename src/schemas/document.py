from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range

from .person import PersonSchema
from .product import ProductSchema
from .document_detail import DocumentDetailSchema
from .payment import PaymentSchema

class DocumentSchema(Schema):
    id = fields.Integer()
    number = fields.Integer()
    date = fields.DateTime()
    document_type = fields.Str()
    sub_total = fields.Float()
    discount = fields.Float()
    tax = fields.Float()
    total = fields.Float()
    exchange = fields.Float()
    person = fields.Nested(PersonSchema)
    payments = fields.Nested(PaymentSchema, many=True)
    details = fields.Nested(DocumentDetailSchema, many=True)

class ParamsDocumentSchema(Schema):
    person = fields.Nested(PersonSchema)
    details = fields.Nested(ProductSchema)
    payments = fields.Nested(PaymentSchema)

document_schema = DocumentSchema()
documents_schema = DocumentSchema(many=True)

params_document_schema = ParamsDocumentSchema()
