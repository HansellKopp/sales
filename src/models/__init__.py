from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class BaseModel(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    created_at = db.Column(db.DateTime(), nullable=False,   default=db.func.current_timestamp())