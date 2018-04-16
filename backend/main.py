"""
endpoints for api and website
"""
from models import Snapshot, City, Park, app, db, send_from_directory, jsonify, Flask, render_template
from flask_restless import APIManager
from config import REACT_FILES
from flask import request
import os
import flask_whooshalchemyplus as whooshalchemy
import json
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

for model in model_objects:
    whooshalchemy.whoosh_index(app, model)

with app.app_context():
    whooshalchemy.init_app(app)
    whooshalchemy.index_all(app)

# unpaginated API endpoints


@app.route('/api/unpaginated/parks')
def unpaginated_parks():
    parks_list = []
    parks = db.session.query(Park).all()
    for park in parks:
        parks_dict = {}
        parks_dict['id'] = park.id
        parks_dict['name'] = park.name
        parks_dict['website'] = park.website
        parks_dict['city_id'] = park.city_id
        parks_dict['address'] = park.address
        parks_dict['state'] = park.state
        parks_dict['country'] = park.country
        if len(park.review_data) < 2:
            park.review_data = "0.0"
        parks_dict['rating'] = float(park.review_data)
        parks_dict['phone_number'] = park.phone_number
        parks_dict['latitude'] = float(park.latitude)
        parks_dict['longitude'] = float(park.longitude)
        parks_dict['image_uri'] = park.image_uri
        parks_list.append(parks_dict)
    final_dict = {"num_results":len(parks_list), "objects":parks_list}
    return json.dumps(final_dict, indent=4, sort_keys=True)


@app.route('/api/unpaginated/cities')
def unpaginated_cities():
    cities_list = []
    cities = db.session.query(City).all()
    for city in cities:
        city_dict = {}
        city_dict['id'] = city.id
        city_dict['name'] = city.name
        city_dict['longitude'] = float(city.longitude)
        city_dict['latitude'] = float(city.latitude)
        city_dict['num_parks'] = city.num_parks
        city_dict['description'] = city.description
        city_dict['state'] = city.state
        city_dict['country'] = city.country
        city_dict['image_uri'] = city.image_uri
        cities_list.append(city_dict)
    final_dict = {"num_results":len(cities_list), "objects":cities_list}
    return json.dumps(final_dict, indent=4, sort_keys=True)

@app.route('/api/unpaginated/snapshots')
def unpaginated_snapshots():
    snapshots_list = []
    snapshots = db.session.query(Snapshot).all()
    for snapshot in snapshots:
        snapshot_dict = {}
        snapshot_dict['id'] = snapshot.id
        snapshot_dict['views'] = snapshot.views
        snapshot_dict['image_uri'] = snapshot.image_uri
        snapshot_dict['park_id'] = snapshot.park_id
        snapshot_dict['city_id'] = snapshot.city_id
        snapshot_dict['tags'] = snapshot.tags
        snapshot_dict['date'] = snapshot.date.isoformat()
        snapshot_dict['longitude'] = float(snapshot.longitude)
        snapshot_dict['latitude'] = float(snapshot.latitude)
        snapshots_list.append(snapshot_dict)
    final_dict = {"num_results":len(snapshots_list), "objects":snapshots_list}
    return json.dumps(final_dict, indent=4, sort_keys=True)

# search method
def search(model, query_val):
    response = model.query.whoosh_search(query_val).all()
    api = API(db.session, model)
    dictionary = dict((r, {}) for r in get_relations(model))
    return jsonify(api._paginated(response, dictionary))

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
