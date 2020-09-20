from flask import Flask

from models import db
from models.user import User
from models.product import Product

from routes.react import REACT_BLUEPRINT
from routes.user import USERS_BLUEPRINT
from routes.product import PRODUCTS_BLUEPRINT

app = Flask(__name__)

def create_app(enviroment):
    app.config.from_object(enviroment)
    app.register_blueprint(REACT_BLUEPRINT)
    app.register_blueprint(USERS_BLUEPRINT)
    app.register_blueprint(PRODUCTS_BLUEPRINT)

    with app.app_context():
        db.init_app(app)
        db.create_all()

    return app