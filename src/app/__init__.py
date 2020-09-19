from flask import Flask

from models import db
from models.user import User

from routes.react import REACT_BLUEPRINT
from routes.user import api_v1

app = Flask(__name__)

def create_app(enviroment):
    app.config.from_object(enviroment)
    app.register_blueprint(api_v1)
    app.register_blueprint(REACT_BLUEPRINT)

    with app.app_context():
        db.init_app(app)
        db.create_all()

    return app