"""
models for database
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON
from api import db

class Park(db.Model):
	__tablename__ = 'parks'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(), nullable=False)
	website = db.Column(db.String())
	description = db.Column(db.String())
	city_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
	state = db.Column(db.String())
	country = db.Column(db.String())
	review_data = db.Column(JSON)
	phone_number = db.Column(db.String())
	longitude = db.Column(db.String())
	latitude = db.Column(db.String())
	city = db.relationship('City',
        backref=db.backref('parks', lazy=True))

	def __init__(self, name, website, description, city_id, state, country, review_data, phone_number, longitude, latitude):

		self.name = name
		self.website = website
		self.description = description
		self.city_id = city_id
		self.state = state
		self.country = country
		self.review_data = review_data
		self.phone_number = phone_number
		self.longitude = longitude
		self.latitude = latitude

	def __repr__(self):
	        return '<Park %r>' % self.name

	def get_id():
		return id
	
	def get_name:
		return self.name

	@name.setter
	def set_name(name):
		self.name = name

	def get_website:
		return self.website

	@website.setter
	def set_website(website):
		self.website = website

	def get_description:
		return self.description

	@description.setter
	def set_description(description):
		self.description = description

	def get_city_id():
		return self.city_id

	@city_id.setter
	def set_city_id(city_id):
		self.city_id = city_id

	def get_state:
		return self.state

	@state.setter
	def set_state(state):
		self.state = state

	def get_country:
		return self.country

	@state.setter
	def set_country(country):
		self.country = country

	def get_review_data():
		return self.review_data

	@review_data.setter
	def set_review_data(review_data):
		self.review_data = review_data

	def get_phone_number:
		return self.phone_number

	@phone_number.setter
	def set_phone_number(phone_number):
		self.phone_number = phone_number

	def get_longitude():
		return self.longitude

	@longitude.setter
	def set_longitude(longitude):
		self.longitude = longitude

	def get_latitude():
		return self.latitude

	@latitude.setter
	def set_latitude(latitude):
		self.latitude = latitude


class Photo(db.Model):
	__tablename__ = 'photos'

	id = db.Column(db.Integer, primary_key=True)
	image_uri = db.Column(db.String(), nullable=False)
	park_id = db.Column(db.Integer, db.ForeignKey('parks.id'))
	city_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
	tags = db.Column(JSON)
	date = db.Column(db.DateTime)
	longitude = db.Column(db.String())
	latitude = db.Column(db.String())
	city = db.relationship('City',
        backref=db.backref('photos', lazy=True))
	park = db.relationship('Park',
        backref=db.backref('photos', lazy=True))

	def __init__(self, image_uri, park_id, tags, date, longitude, latitude):
		self.image_uri = image_uri
		self.city_id = city_id
		self.park_id = park_id
		self.state = state
		self.longitude = longitude
		self.latitude = latitude

	def get_id():
		return id

	def get_city_id():
		return self.city_id

	@city_id.setter
	def set_city_id(city_id):
		self.city_id = city_id

	def get_park_id():
		return self.park_id

	@park_id.setter
	def set_park_id(park_id):
		self.park_id = park_id

	def get_tags:
		return self.tags

	@tags.setter
	def set_tags(tags):
		self.tags = tags

	def get_date():
		return self.date

	@date.setter
	def set_date(date):
		self.date = date

	def get_longitude():
		return self.longitude

	@longitude.setter
	def set_longitude(longitude):
		self.longitude = longitude

	def get_latitude():
		return self.latitude

	@latitude.setter
	def set_latitude(latitude):
		self.latitude = latitude

class City(db.Model):
	__tablename__ = 'cities'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(), nullable=False)
	longitude = db.Column(db.String())
	latitude = db.Column(db.String())
	num_parks = db.Column(db.Integer)
	description = db.Column(db.String())
	state = db.Column(db.String())
	country = db.Column(db.String())

	def __init__(self, name, num_parks, description, state, country, longitude, latitude):
		self.name = name
		self.num_parks = num_parks
		self.description = description
		self.state = state
		self.country = country
		self.longitude = longitude
		self.latitude = latitude

	def __repr__(self):
	        return '<City %r>' % self.name

	def get_id():
		return id

		def get_name:
		return self.name

	@name.setter
	def set_name(name):
		self.name = name

	def get_description:
		return self.description

	@description.setter
	def set_description(description):
		self.description = description

	def get_num_parks():
		return self.num_parks

	@num_parks.setter
	def set_num_parks(num_parks):
		self.num_parks = num_parks

	def get_state:
		return self.state

	@state.setter
	def set_state(state):
		self.state = state

	def get_country:
		return self.country

	@state.setter
	def set_country(country):
		self.country = country

	def get_longitude():
		return self.longitude

	@longitude.setter
	def set_longitude(longitude):
		self.longitude = longitude

	def get_latitude():
		return self.latitude

	@latitude.setter
	def set_latitude(latitude):
		self.latitude = latitude