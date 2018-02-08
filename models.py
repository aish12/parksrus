from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

class Park(db.Model):
	__tablename__ = 'parks'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(), nullable=False)
	website = db.Column(db.String())
	description = db.Column(db.String())
	city_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
	state = db.Column(db.String())
	review_data = db.Column(db.String())
	phone_number = db.Column(db.String())
	long_lat = description = db.Column(db.String())

	def __init(self, name, website, description, city_id, state, review_data, phone_number, long_lat):

		self.name = name
		self.website = website
		self.description = description
		self.city_id = city_id
		self.state = state
		self.review_data = review_data
		self.phone_number = phone_number
		self.long_lat = long_lat


class Photo(db.Model):
	__tablename__ = 'photos'

	id = db.Column(db.Integer, primary_key=True)
	image_uri = db.Column(db.String(), nullable=False)
	park_id = db.Column(db.Integer, db.ForeignKey('parks.id'))
	city_id = db.Column(db.Integer, db.ForeignKey('cities.id'))
	tags = db.Column(db.String())
	date = db.Column(db.DateTime)
	long_lat = description = db.Column(db.String())

	def __init(self, image_uri, park_id, tags, date, long_lat):
		self.image_uri = image_uri
		self.city_id = city_id
		self.park_id = park_id
		self.state = state
		self.long_lat = long_lat

class City(db.Model):
	__tablename__ = 'cities'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(), nullable=False)
	long_lat = description = db.Column(db.String())
	num_parks = db.Column(db.Integer)
	description = db.Column(db.String())
	state = db.Column(db.String())
	country = db.Column(db.String())

	def __init(self, name, num_parks, description, state, country, long_lat):
		self.name = name
		self.num_parks = num_parks
		self.description = description
		self.state = state
		self.country = country
		self.long_lat = long_lat