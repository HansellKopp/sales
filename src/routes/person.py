from flask import request, Blueprint
from .response import response, not_found, bad_request

from models.person import Person

from schemas.person import person_schema
from schemas.person import persons_schema
from schemas.person import params_person_schema

PERSONS_BLUEPRINT = Blueprint('persons', __name__, url_prefix='/api/v1')


def set_person(function):
    def wrap(*args, **kwargs):
        id = kwargs.get('id', 0)
        person = Person.query.filter_by(id=id).first()
        if person is None:
            return not_found()

        return function(person)

    wrap.__name__ = function.__name__
    return wrap


@PERSONS_BLUEPRINT.route('/persons', methods=['GET'])
def get_persons():
    page = int(request.args.get('page', 1))
    order = request.args.get('order', 'asc')
    q = request.args.get('q', '')
    search=request.args.get('search', '')
    persons = []
    if search=='1':
        persons = Person.search(q)
    else:
       persons = Person.get_by_page(order, page, 10, q)
    
    return response(persons_schema.dump(persons))


@PERSONS_BLUEPRINT.route('/persons/<id>', methods=['GET'])
@set_person
def get_person(person):
    return response(person_schema.dump(person))


@PERSONS_BLUEPRINT.route('/persons', methods=['POST'])
def create_person():
    json = request.get_json(force=True)
    error = params_person_schema.validate(json)

    if error:
        return bad_request()

    person = Person.new(firstname=json['firstname'],
                        lastname=json['lastname'],
                        address=json['address'],
                        city=json['city'],
                        state=json['state'],
                        phone=json['phone'],
                        email=json['email'],
                        tax_id=json['tax_id'],
                        price=json['price']
                        )

    if person.save():
        return response(person_schema.dump(person))

    return bad_request()


@ PERSONS_BLUEPRINT.route('/persons/<id>', methods=['PUT'])
@ set_person
def update_person(person):
    json = request.get_json(force=True)
    person.firstname = json.get('firstname', person.firstname)
    person.lastname = json.get('lastname', person.lastname)
    person.address = json.get('address', person.address)
    person.city = json.get('city', person.city)
    person.state = json.get('state', person.state)
    person.phone = json.get('phone', person.phone)
    person.email = json.get('email', person.email)
    person.tax_id = json.get('tax_id', person.tax_id)
    person.price = json.get('price', person.price)

    if person.save():
        return response(person_schema.dump(person))

    return bad_request()


@ PERSONS_BLUEPRINT.route('/persons/<id>', methods=['DELETE'])
@ set_person
def delete_person(person):
    if person.delete():
        return response(person_schema.dump(person))

    return bad_request()
