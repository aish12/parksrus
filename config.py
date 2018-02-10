"""
configuration file
"""
import os
BASE_DIR = os.path.abspath(os.path.dirname('__file__'))
REACT_FILES = os.path.join(BASE_DIR, 'build')

class Config(object):
	SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
	DEBUG = False
	TESTING = False

class ProductionConfig(Config):
	DEBUG = False

class DevelopmentConfig(Config):
	DEVELOPMENT = True
	DEBUG = True

class TestingConfig(Config):
	TESTING = True
