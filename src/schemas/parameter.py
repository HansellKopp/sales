
from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range


class ParameterSchema(Schema):
    class Meta:
        fields = ('id', 'exchange_rate','tax_id',
                  'name', 'address')


class ParamsParameterSchema(Schema):
    exchange_rate = fields.Float(required=True, validate=Range(min_inclusive=0))
    tax_id = fields.Str(required=True, validate=Length(max=50))
    name = fields.Str(required=True, validate=Length(max=150))
    address = fields.Str(required=True, validate=Length(max=150))


parameter_schema = ParameterSchema()
parameters_schema = ParameterSchema(many=True)

params_parameter_schema = ParamsParameterSchema()
