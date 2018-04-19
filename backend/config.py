"""
configuration file
"""
import os

# BASE_DIR is directory above config.py
BASE_DIR = os.path.abspath(os.path.dirname('__file__'))

# append path BASE_DIR to parksrus-frontend/build to get absolute path
REACT_FILES = os.path.join(BASE_DIR, '../frontend/parksrus-frontend/build')


class Config(object):
    # get database url from environmental variable
    SQLALCHEMY_DATABASE_URI = ""
    try:
        SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    except:
        SQLALCHEMY_DATABASE_URI = "postgresql://test:test@localhost:5432/test"
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    DEBUG = True
    TESTING = False


class ProductionConfig(Config):
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_TRACK_MODIFICATIONS = True
