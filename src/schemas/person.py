from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length, Range


class PersonSchema(Schema):
    class Meta:
        fields = ('id', 'firstname', 'lastname',
                  'address', 'city', 'phone', 'email', 'tax_id')


class ParamsPersonSchema(Schema):
    firstname = fields.Str(required=True, validate=Length(max=50))
    lastname = fields.Str(required=True, validate=Length(max=50))
    address = fields.Str(required=True, validate=Length(max=150))
    city = fields.Str(required=True, validate=Length(max=50))
    phone = fields.Str(required=True, validate=Length(max=50))
    email = fields.Str(required=True, validate=Length(max=50))
    tax_id = fields.Str(required=True, validate=Length(max=50))


person_schema = PersonSchema()
persons_schema = PersonSchema(many=True)

params_person_schema = ParamsPersonSchema()
