from flask import request, Blueprint
from .response import response, not_found, bad_request

from models.person import Person
from models.document import Document
from models.parameter import Parameter
from models.document import DocumentPayment
from models.document import DocumentProduct

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
    ## person=Person.get_by_tax_id(new_person['tax_id'])
    person=Person.new_or_update(new_person)
    person.save()
    return response(person_schema.dump(person))


    new_invoice = Document.new_invoice(json)

    ## get new invoice number
    parameter = Parameter.get_first()
    parameter.last_invoice = parameter.last_invoice + 1
    parameter.save()

    if (person == None):
        error = person_schema.validate(new_person)
        if error:
            return error #bad_request()
        person = Person.new(
            firstname=new_person['firstname'],
            tax_id=new_person['tax_id'],
            address=new_person['address'],
            city=new_person['city'],
            email=new_person.get('email', ''),
            phone= new_person.get('phone', ''),
            lastname=new_person.get('lastname', '')
            )
        if not person.save():
            return response({
                "message": "Error unable to save person"
            })
            ## return response(person_schema.dump(person))

    return response(person_schema.dump(person))

    ##return response(parameter_schema.dump(parameter))
    
    # error = params_document_schema.validate(json)
    # if error:
    #     return bad_request()

    document = Document.new(number=json['number'],
                            date=json['date'],
                            document_type=json['document_type'],
                            sub_total=json['sub_total'],
                            discount=json['discount'],
                            tax=json['tax'],
                            total=json['total'],
                            exchange_rate=json['exchange_rate'],
                            person_id=json['person_id'])

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
    document.exchange_rate = json.get('exchange_rate', document.exchange_rate)
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
