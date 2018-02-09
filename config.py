"""
configuration file
"""
import os

class Config(object):
	SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
	DEBUG = False
	TESTING = False
