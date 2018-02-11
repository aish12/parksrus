"""
endpoints for api and website
"""
from models import Photo, City, Park, app, db, send_from_directory, jsonify, request, Flask
from flask_restless import APIManager
from config import REACT_FILES, BASE_DIR
import os

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

if __name__ == '__main__':
	app.run(port = 5000, use_reloader=True, threaded=True)

#test-2
