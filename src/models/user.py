from . import db
from flask_httpauth import HTTPBasicAuth
from sqlalchemy import desc, asc
from sqlalchemy.event import listen
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    created_at = db.Column(db.DateTime(), nullable=False,   default=db.func.current_timestamp())
    email = db.Column(db.String, nullable = False )
    username = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False )
    role = db.Column(db.String, nullable = False, default="user")
    active = db.Column(db.Boolean, nullable = False, default=True )

    @classmethod
    def new(cls, email, password,username):
        return User(email=email, password=password, username=username)

    @classmethod
    def get_by_page(cls, order, page, per_page=10):
        sort = desc(User.id) if order == 'desc' else asc(User.id)
        return User.query.order_by(sort).paginate(page, per_page).items

    @staticmethod
    def verify_auth_token(token):
        s = Serializer('SECRET_KEY')
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired
        except BadSignature:
            return None # invalid token
        user = User.query.get(data['id'])
        return user

    def hash_password(self, password):
        self.password = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password)

    def generate_auth_token(self, expiration = 60 * 60 * 24):
            s = Serializer('SECRET_KEY', expires_in = expiration)
            return s.dumps({ 'id': self.id })

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except:
            return False

    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except:
            return False

    def __str__(self):
         return '<User %r>' % self.email

def insert_users(*args, **kwargs):
    user = User(email='admin@sales.com', username="admin", active=True)
    user.hash_password('password')
    db.session.add(user)
    db.session.commit()

listen(User.__table__, 'after_create', insert_users)