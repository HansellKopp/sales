from flask import Flask

from models import db

from routes.react import REACT_BLUEPRINT
from routes.user import USERS_BLUEPRINT
from routes.product import PRODUCTS_BLUEPRINT
from routes.offer import OFFERS_BLUEPRINT
from routes.person import PERSONS_BLUEPRINT
from routes.document import DOCUMENTS_BLUEPRINT
from routes.invoice import INVOICES_BLUEPRINT
from routes.parameter import PARAMETERS_BLUEPRINT
from routes.auth import AUTH_BLUEPRINT
from routes.reports import REPORTS_BLUEPRINT
from routes.purchases import PURCHASES_BLUEPRINT

app = Flask(__name__)

def create_app(enviroment):
    app.config.from_object(enviroment)
    app.register_blueprint(REACT_BLUEPRINT)
    app.register_blueprint(USERS_BLUEPRINT)
    app.register_blueprint(OFFERS_BLUEPRINT)
    app.register_blueprint(PRODUCTS_BLUEPRINT)
    app.register_blueprint(PERSONS_BLUEPRINT)
    app.register_blueprint(DOCUMENTS_BLUEPRINT)
    app.register_blueprint(INVOICES_BLUEPRINT)
    app.register_blueprint(PARAMETERS_BLUEPRINT)
    app.register_blueprint(AUTH_BLUEPRINT)
    app.register_blueprint(REPORTS_BLUEPRINT)
    app.register_blueprint(PURCHASES_BLUEPRINT)

    with app.app_context():
        db.init_app(app)
        db.create_all()

    return app
