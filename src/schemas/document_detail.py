
from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range


class DocumentDetailSchema(Schema):
    class Meta:
        fields = ('id', 'sku', 'description', 'tax', 'cost','price', 'quantity')

document_detail_schema = DocumentDetailSchema()
document_details_schema = DocumentDetailSchema(many=True)