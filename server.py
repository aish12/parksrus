"""
endpoints for api and website
"""
import os
from flask import Flask, send_from_directory, request, jsonify
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import Photo, City, Park
from config import REACT_FILES, BASE_DIR, ProductionConfig, DevelopmentConfig

app = Flask(__name__, static_folder="../build/static")

CORS(app)
app.config.from_object(ProductionConfig)

db = SQLAlchemy(app)

manager = APIManager(app, flask_sqlalchemy_db=db)
model_objects = [Park, Photo, City]

db.create_all()

kwargs = {
	'methods': frozenset(['GET', 'POST', 'PATCH']),
    'allow_functions': True,
    'results_per_page': 8
}

for model in model_objects:
	manager.create_api(model, **kwargs)

@app.route('/', defaults={'path':''})
@app.route('/<path:path>')
def serve_react(path):
	if path != "":
		if os.path.exists(os.path.join(REACT_FILES, 'index.html')):
			return send_from_directory(REACT_FILES, path)
		else:
			return send_from_directory(REACT_FILES, 'index.html')
	else:
		return send_from_directory(REACT_FILES, 'index.html')

@app.route('/park/<int:id>', methods=["GET"])
def get_park_by_id(id):
	park = session.query(Park).get(id)
	return "Park {}".format(id)

@app.route('/city/<int:id>', methods=["GET"])
def get_city_by_id(id):
	city = session.query(City).get(id)
	return "City {}".format(id)

@app.route('/photos/<int:id>', methods=["GET"])
def get_photo_by_id(id):
	photo = session.query(Photo).get(id)
	return "Photo {}".format(id)

if __name__ == '__main__':
	app.run(port = 5000, use_reloader=True, threaded=True)
