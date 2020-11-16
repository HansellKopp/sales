from datetime import datetime
from flask import request, Blueprint

from flask import Blueprint

from .response import response, not_found, bad_request

from models.parameter import Parameter

from schemas.parameter import parameter_schema
from schemas.parameter import parameters_schema
from schemas.parameter import params_parameter_schema

PARAMETERS_BLUEPRINT = Blueprint('parameters', __name__, url_prefix='/api/v1')


def set_parameter(function):
    def wrap(*args, **kwargs):
        id = kwargs.get('id', 0)
        parameter = Parameter.query.filter_by(id=id).first()
        if parameter is None:
            return not_found()

        return function(parameter)

    wrap.__name__ = function.__name__
    return wrap


@PARAMETERS_BLUEPRINT.route('/parameters', methods=['GET'])
def get_parameters():
    page = int(request.args.get('page', 1))
    order = request.args.get('order', 'desc')

    parameters = Parameter.get_by_page(order, page)

    return response(parameters_schema.dump(parameters))


@PARAMETERS_BLUEPRINT.route('/parameters/<id>', methods=['GET'])
@set_parameter
def get_parameter(parameter):
    return response(parameter_schema.dump(parameter))


@PARAMETERS_BLUEPRINT.route('/parameters', methods=['POST'])
def create_parameter():
    json = request.get_json(force=True)
    error = params_parameter_schema.validate(json) 

    if error:
        print(error)
        return bad_request()

    parameter = Parameter.new(
        exchange_rate=json['exchange_rate'],
        tax_id=json['tax_id'],
        name=json['name'],
        address=json['address'],
        last_invoice=json['last_invoice']
    )
    print(parameter.save())
    if parameter.save():
        return response(parameter_schema.dump(parameter))

    return bad_request()


@PARAMETERS_BLUEPRINT.route('/parameters/<id>', methods=['PUT'])
@set_parameter
def update_parameter(parameter):
    json = request.get_json(force=True)
    parameter.exchange_rate = json.get('exchange_rate', parameter.exchange_rate)
    parameter.tax_id = json.get('tax_id', parameter.tax_id)
    parameter.name = json.get('name', parameter.name)
    parameter.address = json.get('address', parameter.address)
    parameter.last_invoice = json.get('last_invoice', parameter.last_invoice)

    if parameter.save():
        return response(parameter_schema.dump(parameter))

    return bad_request()


@PARAMETERS_BLUEPRINT.route('/parameters/<id>', methods=['DELETE'])
@set_parameter
def delete_parameter(parameter):
    if parameter.delete():
        return response(parameter_schema.dump(parameter))

    return bad_request()
