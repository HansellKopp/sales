from decouple import config

class Config:
    pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data/data.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY='this_is_very_secret'

class TestConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY='this_is_very_secret'

config = {
    'test': TestConfig,
    'development': DevelopmentConfig
}