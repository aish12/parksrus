"""
configuration file
"""
import os
BASE_DIR = os.path.abspath(os.path.dirname('__file__'))
REACT_FILES = os.path.join(BASE_DIR, 'parksrus-frontend/build')

class Config(object):
	SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	DEBUG = False
	TESTING = False

class ProductionConfig(Config):
	DEBUG = False

class DevelopmentConfig(Config):
	DEVELOPMENT = True
	DEBUG = True

class TestingConfig(Config):
	TESTING = True