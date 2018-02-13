"""
endpoints for api and website
"""
from models import Photo, City, Park, app, db, send_from_directory, jsonify, request, Flask, render_template
from flask_restless import APIManager
from config import REACT_FILES
import os

# API manager to create API's with flask_restless
manager = APIManager(app, flask_sqlalchemy_db=db)
model_objects = [Park, Photo, City]

# create tables for each model
db.create_all()

# arguments for API (methods allowed, pagination, etc)
kwargs = {
    'methods': frozenset(['GET', 'POST', 'PATCH']),
    'allow_functions': True,
    'results_per_page': 8
}

# create API endpoint for each model
for model in model_objects:
    manager.create_api(model, **kwargs)

# serve the React app
@app.route('/', defaults={'path': ''})
@app.route("/<string:path>")
@app.route('/<path:path>')
def serve_react(path):
    if path != "":
        if os.path.exists(os.path.join(REACT_FILES, 'index.html')):
            return send_from_directory(REACT_FILES, path)
        else:
            return send_from_directory(REACT_FILES, 'index.html')
    else:
        return send_from_directory(REACT_FILES, 'index.html')

# run on port 5000
if __name__ == '__main__':
    app.run(port=5000, use_reloader=True, threaded=True)
