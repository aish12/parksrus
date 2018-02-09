"""
endpoints for api and website
"""
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import models

app = Flask(__name__)
#app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#TODO change sql URL to env variable
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)
#TODO distinguishing REST API endpoints from ones that serve up web pages

@app.route('/')
def hello_world():
	return "Hello World!"

@app.route('/<name>')
def hello_world_name(name):
	return "Hello {}!".format(name)

@app.route('/city')
def city_page():
	return "Cities Page!"

@app.route('/photos')
def photo_page():
	return "Photo Page!"

@app.route('/park')
def park_page():
	return "Park Page!"

@app.route('/park/<int:id>', methods=["GET"])
def get_park_by_id(id):
	return "Park {}".format(id)

@app.route('/city/<int:id>', methods=["GET"])
def get_city_by_id(id):
	return "City {}".format(id)

@app.route('/photos/<int:id>', methods=["GET"])
def get_photo_by_id(id):
	return "Photo {}".format(id)

if __name__ == '__main__':
	app.run(port = 5000, use_reloader=True, threaded=True)