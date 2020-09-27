from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range


class PersonSchema(Schema):
    class Meta:
        fields = ('id', 'firstname', 'lastname',
                  'address', 'city', 'state', 'phone', 'email', 'tax_id', 'active', 'price')


class ParamsPersonSchema(Schema):
    firstname = fields.Str(required=True, validate=Length(max=50))
    lastname = fields.Str(required=True, validate=Length(max=50))
    address = fields.Str(required=True, validate=Length(max=150))
    city = fields.Str(required=True, validate=Length(max=50))
    state = fields.Str(required=True, validate=Length(max=50))
    phone = fields.Str(required=True, validate=Length(max=50))
    email = fields.Str(required=True, validate=Length(max=50))
    tax_id = fields.Str(required=True, validate=Length(max=50))
    active = fields.Bool(required=False)
    price = fields.Int(required=True, validate=Range(
        min_inclusive=0, max_inclusive=4))


person_schema = PersonSchema()
persons_schema = PersonSchema(many=True)

params_person_schema = ParamsPersonSchema()
