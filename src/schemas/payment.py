
from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range


class PaymentSchema(Schema):
    class Meta:
        fields = ('id', 'amount','exchange',
                  'payment_type', 'details')


class ParamsPaymentSchema(Schema):
    amount = fields.Float(required=True, validate=Range(min_inclusive=0))
    exchange = fields.Float(required=True, validate=Range(min_inclusive=0))
    payment_type = fields.Str(required=True, validate=Length(max=50))
    details = fields.Str(required=True, validate=Length(max=150))


payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)

params_payment_schema = ParamsPaymentSchema()
