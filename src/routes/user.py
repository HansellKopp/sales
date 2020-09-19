from flask import request

from .api import api_v1
from .response import response, not_found, bad_request

from models.user import User

from schemas import user_schema
from schemas import users_schema
from schemas import params_user_schema

def set_user(function):
    def wrap(*args, **kwargs):
        id = kwargs.get('id', 0)
        user = User.query.filter_by(id=id).first()
        if user is None:
            return not_found()

        return function(user)
    
    wrap.__name__ = function.__name__
    return wrap

@api_v1.route('/users', methods=['GET'])
def get_users():
    page = int(request.args.get('page', 1))
    order = request.args.get('order', 'desc')
    
    users = User.get_by_page(order, page)

    return response(users_schema.dump(users))


@api_v1.route('/users/<id>', methods=['GET'])
@set_user
def get_user(user):
    return response(user_schema.dump(user))

@api_v1.route('/users', methods=['POST'])
def create_user():
    json = request.get_json(force=True)
    error = params_user_schema.validate(json)

    if error:
        return bad_request()

    user = User.new(json['email'], json['password'])
    if user.save():
        return response(user_schema.dump(user))
    
    return bad_request()

@api_v1.route('/users/<id>', methods=['PUT'])
@set_user
def update_user(user):
    json = request.get_json(force=True)

    user.password = json.get('password', user.password)
    user.email = json.get('email', user.email)

    if user.save():
        return response(user_schema.dump(user))

    return bad_request()

@api_v1.route('/users/<id>', methods=['DELETE'])
@set_user
def delete_user(user):
    if user.delete():
        return response(user_schema.dump(user))
    
    return bad_request()