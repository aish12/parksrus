"""
endpoints for api and website
"""

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route('/')
def hello_world():
	return "Hello World!"

@app.route('/<name>')
def hello_world_name():
	return "Hello {}!".format(name)

@app.route('/city')
def city_page():
	return "Hello World!"

@app.route('/photos')
def photo_page():
	return "Hello World!"

@app.route('/park')
def park_page():
	return "Hello World!"

@app.route('/park/<id>')
def get_park_by_id():
	return "Hello World!"

@app.route('/city/<id>')
def get_city_by_id():
	return "Hello World!"

@app.route('/photos/<id>')
def get_photo_by_id():
	return "Hello World!"

if __name__ == '__main__':
	app.run(port = 5000, use_reloader=True, threaded=True)