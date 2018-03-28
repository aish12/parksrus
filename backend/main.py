"""
endpoints for api and website
"""
from models import Snapshot, City, Park, app, db, send_from_directory, jsonify, Flask, render_template
from flask_restless import APIManager
from config import REACT_FILES
from flask import request
import os
import flask_whooshalchemyplus as whooshalchemy
from flask_restless.views import API, get_relations

# API manager to create API's with flask_restless
manager = APIManager(app, flask_sqlalchemy_db=db)
model_objects = [Park, Snapshot, City]

# create tables for each model
db.create_all()

# arguments for API (methods allowed, pagination, etc)
kwargs = {
    'methods': frozenset(['GET']),
    'allow_functions': True,
    'results_per_page': 10
}

# create API endpoint for each model
for model in model_objects:
    manager.create_api(model, **kwargs)

whooshalchemy.init_app(app)
whooshalchemy.index_all(app)

for model in model_objects:
    whooshalchemy.whoosh_index(app, model)

# search method
def search(model, query_val):
    #response = model.query.whoosh_search(query_val).all()
    response = db.session.query(City).whoosh_search(query_val).all()
    return str(response)
    """
    api = API(db.session, model)
    dictionary = dict((r, {}) for r in get_relations(model))
    return jsonify(api._paginated(response, dictionary))
    """

# search endpoints

@app.route('/api/search/parks')
def search_cities():
    query = request.args.get('query')
    return search(Park, query)

@app.route('/api/search/cities')
def search_parks():
    query = request.args.get('query')
    return search(City, query)

@app.route('/api/search/snapshots')
def search_snapshots():
    query = request.args.get('query')
    return search(Snapshot, query)

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
    print ('*** STARTING APPLICATION ***')
    app.run(port=5000, use_reloader=True, threaded=True)