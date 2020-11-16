
from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range


class PaymentSchema(Schema):
    class Meta:
        fields = ('id', 'amount','amount',
                  'paymentType', 'details')


class ParamsPaymentSchema(Schema):
    amount = fields.Float(required=True, validate=Range(min_inclusive=0))
    amountBs = fields.Float(required=True, validate=Range(min_inclusive=0))
    paymentType = fields.Str(required=True, validate=Length(max=50))
    details = fields.Str(required=True, validate=Length(max=150))


payment_schema = PaymentSchema()
payments_schema = PaymentSchema(many=True)

params_payment_schema = ParamsPaymentSchema()
