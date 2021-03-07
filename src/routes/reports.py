from flask import request, Blueprint
from datetime import datetime, timedelta
from sqlalchemy import exc
from datetime import datetime
from .response import response, not_found, bad_request

from marshmallow import Schema

from models import db
from models.person import Person
from models.document import Document
from models.document_payment import DocumentPayment
from models.document_detail import DocumentDetail


REPORTS_BLUEPRINT = Blueprint('reports', __name__, url_prefix='/api/v1')

@REPORTS_BLUEPRINT.route('/reports/summary', methods=['GET'])
def get_documents():
    date = request.args.get('date', datetime.today())
    date_from=datetime.fromisoformat(date)
    date_to=datetime.fromisoformat(date)+timedelta(days=1)

    data = db.session.query(DocumentPayment.payment_type, db.func.sum(DocumentPayment.amount), db.func.sum(DocumentPayment.amount) * Document.exchange )\
        .join(Document, Document.id == DocumentPayment.document_id)\
        .filter(Document.date >= date_from).filter(Document.date <= date_to)\
        .filter(Document.document_type=='FACTURA')\
        .group_by(DocumentPayment.payment_type).all()

    payments=[]
    for item in data:
        payments.append({
            "payment_type": item[0],
            "total": item[1],
            "total_bs": item[2]
        })
        
    data = db.session.query(DocumentDetail.description, db.func.sum(DocumentDetail.quantity))\
        .join(Document, Document.id == DocumentDetail.document_id)\
        .filter(Document.date >= date_from).filter(Document.date <= date_to)\
        .filter(Document.document_type=='FACTURA')\
        .group_by(DocumentDetail.product_id).all()

    products=[]
    for item in data:
        products.append({
            "description": item[0],
            "quantity": item[1]
        })
        
    data = db.session.query(Document.number, Person.tax_id,\
            Person.firstname, Person.lastname,  Document.total,\
            Document.total * Document.exchange, Document.exchange)\
        .join(Person, Person.id == Document.person_id)\
        .filter(Document.date >= date_from).filter(Document.date <= date_to)\
        .filter(Document.document_type=='FACTURA')\
        .order_by(Document.number).all()

    invoices=[]
    for item in data:
        invoices.append({
            "number": item[0],
            "tax_id": item[1],
            "fullname": item[2] + ' ' + item[3],
            "total": item[4],
            "total_bs": item[5],
            "exchange":item[6]
        })


    results = {
        "invoices": invoices,
        "payments": payments,
        "products": products
    }

    return response(results)

