"""
models for database
"""
import os
from flask import Flask, send_from_directory, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import REACT_FILES, BASE_DIR, ProductionConfig, DevelopmentConfig
from flask_restless.views import API, get_relations

# create app
app = Flask(
    __name__, static_folder="../frontend/parksrus-frontend/build/static")

# enable cross origin requests
CORS(app)

# change DB settings based on environment
try:
    if os.environ['DB_MODE'] == 'TESTING':
        app.config.from_object(TestingConfig)
    elif os.environ['DB_MODE'] == 'DEVELOPMENT':
        app.config.from_object(DevelopmentConfig)
    else:
        app.config.from_object(ProductionConfig)
except:
    app.config.from_object(ProductionConfig)

# configure whoosh base (where index files are kept)
app.config['WHOOSH_BASE'] = os.path.join(BASE_DIR, 'whoosh_index')

# initialize db
db = SQLAlchemy(app)


class Park(db.Model):
    __tablename__ = 'parks'
    __searchable__ = ['name', 'state']

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    website = db.Column(db.String())
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
    address = db.Column(db.String())
    state = db.Column(db.String())
    country = db.Column(db.String())
    review_data = db.Column(db.String())
    phone_number = db.Column(db.String())
    longitude = db.Column(db.String())
    latitude = db.Column(db.String())
    image_uri = db.Column(db.String())
    city = db.relationship('City',
                           backref=db.backref('parks', lazy='dynamic'))

    def __init__(self, name, website, review_data, phone_number, longitude, latitude, image_uri, address="", city_id=0, state="", country=""):

        self.name = name
        self.website = website
        self.city_id = city_id
        self.state = state
        self.country = country
        self.address = address
        self.review_data = review_data
        self.phone_number = phone_number
        self.longitude = longitude
        self.latitude = latitude
        self.image_uri = image_uri

    def __repr__(self):
        return '<Park %r>' % self.name

    @property
    def get_id(self):
        return id

    @property
    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    @property
    def get_website(self):
        return self.website

    def set_website(self, website):
        self.website = website

    @property
    def get_city_id(self):
        return self.city_id

    def set_city_id(self, city_id):
        self.city_id = city_id

    @property
    def get_address(self):
        return self.address

    def set_address(self, address):
        self.address = address

    @property
    def get_state(self):
        return self.state

    def set_state(self, state):
        self.state = state

    @property
    def get_country(self):
        return self.country

    def set_country(self, country):
        self.country = country

    @property
    def get_review_data(self):
        return self.review_data

    def set_review_data(self, review_data):
        self.review_data = review_data

    @property
    def get_phone_number(self):
        return self.phone_number

    def set_phone_number(self, phone_number):
        self.phone_number = phone_number

    @property
    def get_longitude(self):
        return self.longitude

    def set_longitude(self, longitude):
        self.longitude = longitude

    @property
    def get_latitude(self):
        return self.latitude

    def set_latitude(self, latitude):
        self.latitude = latitude


class Snapshot(db.Model):
    __tablename__ = 'snapshots'
    __searchable__ = ['tags']

    id = db.Column(db.Integer, primary_key=True)
    views = db.Column(db.Integer)
    image_uri = db.Column(db.String(), nullable=False)
    park_id = db.Column(db.Integer, db.ForeignKey('parks.id'))
    city_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
    tags = db.Column(db.String())
    date = db.Column(db.DateTime)
    longitude = db.Column(db.String())
    latitude = db.Column(db.String())
    city = db.relationship('City',
                           backref=db.backref('snapshots', lazy='dynamic'))
    park = db.relationship('Park',
                           backref=db.backref('snapshots', lazy='dynamic'))

    def __init__(self, image_uri, tags, date, longitude="", latitude="", park_id=0, city_id=0, views=0):
        self.views = views
        self.image_uri = image_uri
        self.city_id = city_id
        self.park_id = park_id
        self.longitude = longitude
        self.latitude = latitude
        self.tags = tags
        self.date = date

    @property
    def get_id():
        return id

    def get_city_id(self):
        return self.city_id

    def set_city_id(self, city_id):
        self.city_id = city_id

    @property
    def get_park_id(self):
        return self.park_id

    def set_park_id(self, park_id):
        self.park_id = park_id

    @property
    def get_tags(self):
        return self.tags

    def set_tags(self, tags):
        self.tags = tags

    @property
    def get_date(self):
        return self.date

    def set_date(self, date):
        self.date = date

    @property
    def get_longitude(self):
        return self.longitude

    def set_longitude(self, longitude):
        self.longitude = longitude

    @property
    def get_latitude(self):
        return self.latitude

    def set_latitude(self, latitude):
        self.latitude = latitude


class City(db.Model):
    __tablename__ = 'cities'
    __searchable__ = ['name', 'state', 'description']

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    longitude = db.Column(db.String())
    latitude = db.Column(db.String())
    num_parks = db.Column(db.Integer)
    description = db.Column(db.String())
    state = db.Column(db.String())
    country = db.Column(db.String())
    image_uri = db.Column(db.String())

    def __init__(self, name, description, state, country, longitude, latitude, image_uri, num_parks=0):
        self.name = name
        self.num_parks = num_parks
        self.description = description
        self.state = state
        self.country = country
        self.longitude = longitude
        self.latitude = latitude
        self.image_uri = image_uri

    def __repr__(self):
        return '<City %r>' % self.name

    @property
    def get_id(self):
        return id

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    @property
    def get_description(self):
        return self.description

    def set_description(self, description):
        self.description = description

    @property
    def get_num_parks(self):
        return self.num_parks

    def set_num_parks(self, num_parks):
        self.num_parks = num_parks

    @property
    def get_state(self):
        return self.state

    def set_state(self, state):
        self.state = state

    @property
    def get_country(self):
        return self.country

    def set_country(self, country):
        self.country = country

    @property
    def get_longitude(self):
        return self.longitude

    def set_longitude(self, longitude):
        self.longitude = longitude

    @property
    def get_latitude(self):
        return self.latitude

    def set_latitude(self, latitude):
        self.latitude = latitude
