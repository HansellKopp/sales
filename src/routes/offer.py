from datetime import datetime
from flask import request, Blueprint

from flask import Blueprint

from .response import response, not_found, bad_request

from models.offer import Offer

from schemas.offer import offer_schema
from schemas.offer import offers_schema
from schemas.offer import params_offer_schema

OFFERS_BLUEPRINT = Blueprint('offers', __name__, url_prefix='/api/v1')


def set_offer(function):
    def wrap(*args, **kwargs):
        id = kwargs.get('id', 0)
        offer = Offer.query.filter_by(id=id).first()
        if offer is None:
            return not_found()

        return function(offer)

    wrap.__name__ = function.__name__
    return wrap


@OFFERS_BLUEPRINT.route('/offers', methods=['GET'])
def get_offers():
    page = int(request.args.get('page', 1))
    order = request.args.get('order', 'desc')

    offers = Offer.get_by_page(order, page)

    return response(offers_schema.dump(offers))


@OFFERS_BLUEPRINT.route('/offers/<id>', methods=['GET'])
@set_offer
def get_offer(offer):
    return response(offer_schema.dump(offer))


@OFFERS_BLUEPRINT.route('/offers', methods=['POST'])
def create_offer():
    json = request.get_json(force=True)
    error = params_offer_schema.validate(json) 
    json['starts_at'] = datetime(2020, 1, 1, 10, 10, 0) ## todo convert date parameters
    json['ends_at'] = datetime(2021, 1, 1, 10, 10, 0)

    if error:
        print(error)
        return bad_request()

    offer = Offer.new(
        departament=json['departament'],
        description=json['description'],
        cost=json['cost'],
        tax=json['tax'],
        price=json['price'],
        quantity=json['quantity'],
        starts_at=json['starts_at'],
        ends_at=json['ends_at'],
        product_id=json['product_id'],
    )
    print(offer.save())
    if offer.save():
        return response(offer_schema.dump(offer))

    return bad_request()


@OFFERS_BLUEPRINT.route('/offers/<id>', methods=['PUT'])
@set_offer
def update_offer(offer):
    json = request.get_json(force=True)
    offer.departament = json.get('departament', offer.departament)
    offer.description = json.get('description', offer.description)
    offer.tax = json.get('tax', offer.tax)
    offer.cost = json.get('cost', offer.cost)
    offer.price = json.get('price', offer.price)
    offer.quantity = json.get('quantity', offer.quantity)
    offer.start_at = json.get('starts_at', offer.starts_at)
    offer.end_at = json.get('ends_at', offer.ends_at)
    offer.product_id = json.get('product_id', offer.product_id)

    if offer.save():
        return response(offer_schema.dump(offer))

    return bad_request()


@OFFERS_BLUEPRINT.route('/offers/<id>', methods=['DELETE'])
@set_offer
def delete_offer(offer):
    if offer.delete():
        return response(offer_schema.dump(offer))

    return bad_request()
