from decouple import config

class Config:
    pass

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///data/data.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

config = {
    'test': TestConfig,
    'development': DevelopmentConfig
}