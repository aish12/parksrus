"""
configuration file
"""
import os

# BASE_DIR is directory above config.py
BASE_DIR = os.path.abspath(os.path.dirname('__file__'))

# append path BASE_DIR to parksrus-frontend/build to get absolute path
REACT_FILES = os.path.join(BASE_DIR, 'parksrus-frontend/build')


class Config(object):
    # get database url from environmental variable
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False
    TESTING = False


class ProductionConfig(Config):
    DEBUG = False
    #SERVER_NAME = 'parksr.us'


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
