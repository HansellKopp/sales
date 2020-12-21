from flask import request, Blueprint
from datetime import datetime
from .response import response, not_found, bad_request

from models.person import Person
from models.document import Document
from models.parameter import Parameter
from models.document import Document
from models.document_detail import DocumentDetail
from models.document_payment import DocumentPayment

from schemas.parameter import parameter_schema
from schemas.person import person_schema
from schemas.document import document_schema
from schemas.document import documents_schema
from schemas.document import params_document_schema

DOCUMENTS_BLUEPRINT = Blueprint('documents', __name__, url_prefix='/api/v1')

def set_document(function):
    def wrap(*args, **kwargs):
        id = kwargs.get('id', 0)
        document = Document.query.filter_by(id=id).first()
        if document is None:
            return not_found()

        return function(document)

    wrap.__name__ = function.__name__
    return wrap


@DOCUMENTS_BLUEPRINT.route('/documents', methods=['GET'])
def get_documents():
    page = int(request.args.get('page', 1))
    order = request.args.get('order', 'desc')

    documents = Document.get_by_page(order, page)

    return response(documents_schema.dump(documents))


@DOCUMENTS_BLUEPRINT.route('/documents/<id>', methods=['GET'])
@set_document
def get_document(document):
    return response(document_schema.dump(document))


@DOCUMENTS_BLUEPRINT.route('/documents', methods=['POST'])
def create_document():
    json = request.get_json(force=True)
    ## update or create person
    new_person = json['person']
    products = json['products']
    
    person=Person.new_or_update(new_person)
    person.save()

    ## get new invoice number
    parameter = Parameter.get_first()
    parameter.last_invoice = parameter.last_invoice + 1
    parameter.save()


    total = 0
    discount = 0
    total_tax =0
    sub_total = 0
    person_id=person.id
    exchange=parameter.exchange
    for product in products:
        base = product.price
        tax = base * product.tax
        subtotal = subtotal + (base - tax)
        total = total + base
    total= sub_total + tax
    document = Document.new(
            person_id=person_id,number=parameter.last_invoice, date=datetime.now(), document_type='FACTURA',
            sub_total=sub_total, discount=discount, tax=total_tax, total=total, exchange=exchange)
    if document.save():
        return response(document_schema.dump(document))

    return bad_request()


@ DOCUMENTS_BLUEPRINT.route('/documents/<id>', methods=['PUT'])
@ set_document
def update_document(document):
    json = request.get_json(force=True)
    document.number = json.get('number', document.number)
    document.date = json.get('date', document.date)
    document.document_type = json.get('document_type', document.document_type)
    document.sub_total = json.get('sub_total', document.sub_total)
    document.discount = json.get('discount', document.discount)
    document.tax = json.get('tax', document.tax)
    document.total = json.get('total', document.total)
    document.exchange = json.get('exchange', document.exchange)
    document.person_id = json.get('person_id', document.person_id)

    if document.save():
        return response(document_schema.dump(document))

    return bad_request()


@ DOCUMENTS_BLUEPRINT.route('/documents/<id>', methods=['DELETE'])
@ set_document
def delete_document(document):
    if document.delete():
        return response(document_schema.dump(document))

    return bad_request()
