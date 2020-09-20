
from marshmallow import Schema
from marshmallow import fields
from marshmallow.validate import Length

class UserSchema(Schema):
    class Meta:
        fields = ('id','email', 'username', 'password', 'active')

class ParamsUserSchema(Schema):
    email = fields.Str(required=True, validate=Length(max=50))
    password = fields.Str(required=True, validate=Length(max=50))
    username = fields.Str(required=True, validate=Length(max=50))
 
user_schema = UserSchema()
users_schema = UserSchema(many=True)

params_user_schema = ParamsUserSchema()