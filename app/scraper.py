"""
Script that will scrape API's to gather info for database
"""

from googleplaces import GooglePlaces, types, lang
from models import Photo, City, Park, db

GOOGLE_API_KEY = os.environ['GOOGLE_PLACES_KEY']

google_places = GooglePlaces(GOOGLE_API_KEY)

def city_wide_search(latitude, longitude):

def search_parks_in_city(latitude, longitude):
	coordinate_dict = {}
	coordinate_dict['lat'] = latitude
	coordinate_dict['lng'] = longitude

	query_result = google_places.nearby_search(lat_lng=coordinate_dict,
    	radius=50000, types=[types.TYPE_AMUSEMENT_PARK])

	# iterate over query results to get more detailed info

	for place in query_result.places:
		place.get_details()
		photo = None

		#debugging
		print (place.name)
    	print (place.geo_location)
    	print (place.place_id)
    	print (place.details) # A dict matching the JSON response from Google.
    	print (place.local_phone_number)
    	print (place.international_phone_number)
    	print (place.website)
    	print (place.url)

		if len(place.photos) > 0:
			photo = place.photos[0]

		if photo == None:
			continue
		else:
			photo.get(maxheight=500, maxwidth=500)
			url = photo.url



def search_parks_in_city(city, country):
	loc_string = city + ', ' + country

	query_result = google_places.nearby_search(location=loc_string,
    	radius=50000, types=[types.TYPE_AMUSEMENT_PARK])

	# iterate over query results to get more detailed info

	"""
	if query_result.has_next_page_token:
	    query_result_next_page = google_places.nearby_search(pagetoken=query_result.next_page_token)
	"""

def get_coordinates(city):
	"""
	Gets coordinates of a city based on its name
	"""

def get_coordinates(city, country):
	"""
	Gets coordinates of a city based on name and country
	"""

def get_coordinates_park(park):
	"""
	Gets coordinates of an amusement park based on its name
	"""

def add_park_to_database():

def add_photo_to_database():

def add_city_to_database():
