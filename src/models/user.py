from . import db
from sqlalchemy import desc, asc
from sqlalchemy.event import listen


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
    db.session.add(
        User(email='admin@sales.com', username="admin", password='password', active=True)
    )
    db.session.commit()

listen(User.__table__, 'after_create', insert_users)