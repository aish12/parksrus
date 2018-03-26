"""
endpoints for api and website
"""
from models import Snapshot, City, Park, app, db, send_from_directory, jsonify, request, Flask, render_template
from flask_restless import APIManager
from config import REACT_FILES
import os
import flask_whooshalchemyplus as whooshalchemy

# API manager to create API's with flask_restless
manager = APIManager(app, flask_sqlalchemy_db=db)
model_objects = [Park, Snapshot, City]

# create tables for each model
db.create_all()

for model in model_objects:
    whooshalchemy.whoosh_index(app, model)

# arguments for API (methods allowed, pagination, etc)
kwargs = {
    'methods': frozenset(['GET', 'POST', 'PATCH']),
    'allow_functions': True,
    'results_per_page': 10
}

# create API endpoint for each model
for model in model_objects:
    manager.create_api(model, **kwargs)

# search method
def search(model):
    query = request.args.get('query')
    response = model.query.whoosh_search(query)
    api = API(db.session, model)
    dictionary = dict((r, {}) for r in get_relations(model))
    return jsonify(api._paginated(response, dictionary))

# search endpoints

@app.route('/api/search/parks')
def search_cities():
    return search(Park)

@app.route('/api/search/cities')
def search_parks():
    return search(City)

@app.route('/api/search/snapshots')
def search_snapshots():
    return search(Snapshot)

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