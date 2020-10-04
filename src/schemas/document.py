from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range


class DocumentSchema(Schema):
    class Meta:
        fields = ('id', 'number', 'date',
                  'document_type', 'sub_total', 'discount', 'tax', 'total',
                  'exchange_rate', 'person_id')


class ParamsDocumentSchema(Schema):
    number = fields.Str(required=True, validate=Length(max=50))
    date = fields.Date(required=True)
    document_type = fields.Str(required=True, validate=Length(max=50))
    sub_total = fields.Float(required=True, validate=Range(min_inclusive=0))
    discount = fields.Float(required=True, validate=Range(min_inclusive=0))
    tax = fields.Float(required=True, validate=Range(min_inclusive=0))
    total = fields.Float(required=True, validate=Range(min_inclusive=0))
    exchange_rate = fields.Float(
        required=True, validate=Range(min_inclusive=0))
    person_id = fields.Integer(required=False)


document_schema = DocumentSchema()
documents_schema = DocumentSchema(many=True)

params_document_schema = ParamsDocumentSchema()
