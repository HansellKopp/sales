from flask import request, Blueprint, jsonify, g
from flask_httpauth import HTTPBasicAuth
from .response import response, not_found, bad_request, unauthorized

from models.user import User

auth = HTTPBasicAuth()

AUTH_BLUEPRINT = Blueprint('auth', __name__, url_prefix='/api/v1')

@auth.verify_password
def verify_password(username, password):
    print(username, password)
    user = User.query.filter_by(username = username).first()
    if not user or not user.verify_password(password):
        return False
    g.user = user
    return True

@AUTH_BLUEPRINT.route('/auth/login', methods=['POST'])
def get_resource():
    json = request.get_json(force=True)
    username = json['username']
    password = json['password']
    user = User.query.filter_by(username = username).first()
    if not user or not user.verify_password(password):        
        return unauthorized({'password': 'invalid username or password'})
    return response({
        'username': user.username, 
        'role': user.role, 
        'active': user.active
    })


