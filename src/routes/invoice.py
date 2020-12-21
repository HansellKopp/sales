from flask import request, Blueprint
from sqlalchemy import exc
from datetime import datetime
from marshmallow import ValidationError
from .response import response, not_found, bad_request

from models import db
from models.person import Person
from models.document import Document
from models.document_detail import DocumentDetail
from models.document_payment import DocumentPayment
from models.parameter import Parameter

from schemas.parameter import parameter_schema
from schemas.person import person_schema
from schemas.person import params_person_schema
from schemas.document import document_schema
from schemas.document import documents_schema
from schemas.document import params_document_schema

INVOICES_BLUEPRINT = Blueprint('invoices', __name__, url_prefix='/api/v1')


def set_document(function):
    def wrap(*args, **kwargs):
        id = kwargs.get('id', 0)
        document = Document.query.filter_by(id=id).first()
        if document is None:
            return not_found()

        return function(document)

    wrap.__name__ = function.__name__
    return wrap


@INVOICES_BLUEPRINT.route('/invoices', methods=['GET'])
def get_documents():
    page = int(request.args.get('page', 1))
    order = request.args.get('order', 'desc')

    invoices = Document.get_by_page(order, page)

    return response(documents_schema.dump(invoices))


@INVOICES_BLUEPRINT.route('/invoices/<id>', methods=['GET'])
@set_document
def get_document(document):
    return response(document_schema.dump(document))


@INVOICES_BLUEPRINT.route('/invoices', methods=['POST'])
def create_document():
    json = request.get_json(force=True)
    ## update or create person
    new_person = json['person']
    error=params_person_schema.validate(new_person)
    if error:
        print(error)
        return bad_request()

    products = json['products']
    
    person=Person.new_or_update(new_person)
    db.session.add(person)
    
    ## get new invoice number
    parameter = Parameter.get_first()
    parameter.last_invoice = parameter.last_invoice + 1
    db.session.add(parameter)

    total = 0
    discount = 0
    total_tax =0
    sub_total = 0
    person_id=person.id
    exchange=parameter.exchange
    for product in products:
        base = product.get('price') # * product.quantity
        tax = base * product.get('tax')
        sub_total = sub_total + (base - tax)
        total = total + base
        total_tax = total_tax + tax

    total= sub_total + total_tax

    document = Document.new(person_id=person_id,number=parameter.last_invoice, date=datetime.now(), document_type='FACTURA',
            sub_total=sub_total, discount=discount, tax=total_tax, total=total, exchange=exchange)

    print(document.sub_total)
    print(document.tax)
    print(document.total)

    for product in products:
        document_detail=DocumentDetail.new(cost=product.get('cost'), price=product.get('price'), quantity=product.get('quantity'),
            sku=product.get('sku'), tax=product.get('tax'), departament=product.get('departament'), description=product.get('description'),
            product_id=product.get('id'),
            document_id=document.id
        )
        document.details.append(document_detail)

    payments = json['payments']
    for payments in payments:
        payment=DocumentPayment.new(payment_type=payments.get('payment_type'), 
            amount=payments.get('amount'), exchange=payments.get('exchange'),
            details=payments.get('details'), document_id=document.id
        )
        document.payments.append(payment)

    #try:
    #    print(document_schema.dump(document))
    #except ValidationError as err:
    #    print(err.messages)


    db.session.add(document)
    
    try:
        db.session.commit()
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        print(e)
        return bad_request()

    return response(document_schema.dump(document))


@ INVOICES_BLUEPRINT.route('/invoices/<id>', methods=['PUT'])
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


@ INVOICES_BLUEPRINT.route('/invoices/<id>', methods=['DELETE'])
@ set_document
def delete_document(document):
    if document.delete():
        return response(document_schema.dump(document))

    return bad_request()