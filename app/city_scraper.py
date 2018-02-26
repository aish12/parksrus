"""
Script that will scrape API's to gather info for database
"""

from googleplaces import GooglePlaces, types, lang
from models import Snapshot, City, Park, db
import re
import requests
import os

GOOGLE_API_KEY = os.environ['GOOGLE_PLACES_KEY']

google_places = GooglePlaces(GOOGLE_API_KEY)


def search_for_city(name):
    """
    Get city data from the Google Places API
    """

    query_result = google_places.nearby_search(location=name)

    place = query_result.places[0]
    place.get_details()
    photo = None

    # debugging
    #print (place.name)
    #print (place.formatted_address)
    #print (place.geo_location)
    #print (place.place_id)

    longitude = place.geo_location['lng']
    latitude = place.geo_location['lat']
    #print(longitude)
    #print(latitude)
    #print (place.details)  # A dict matching the JSON response from Google.

    photo = place.photos[0]
    # 'maxheight' or 'maxwidth' is required
    photo.get(maxheight=500, maxwidth=500)
    # MIME-type, e.g. 'image/jpeg'
    photo.mimetype
    # Image URL
    photo.url
    # Original filename (optional)
    photo.filename
    # Raw image data
    photo.data

    #print(photo.url)

    return (str(place.name), str(longitude), str(latitude), str(photo.url))

def get_wikipedia_description(name):
    """
    get description of a city from the Wikipedia api
    """

    url = "https://en.wikipedia.org/w/api.php"

    name = format_name_for_wikipedia(name)

    querystring = {"action":"query","prop":"extracts","exintro":"","explaintext":"","format":"json","redirects":"","titles":name}

    headers = {
        'cache-control': "no-cache",
        'postman-token': "e569a537-1dd2-a750-c10d-69c760cbc90a"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    json_data = response.json()

    description = json_data["query"]["pages"].values()[0]["extract"]
    n = 1  # run at least once
    while n:
        description, n = re.subn(r'\([^()]*\)', '', description)
    description = description.replace("  ", " ")
    description = description.replace(")", "")
    return description

def format_name_for_wikipedia(name):
    name = name.replace(" ", "_")
    name = name.replace("\n", "")
    return name


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

        # debugging
        print (place.name)
        print (place.geo_location)
        print (place.place_id)
        print (place.details)  # A dict matching the JSON response from Google.
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


def search_parks_in_city(name):
    query_result = google_places.nearby_search(location=name,
                                               radius=50000, types=[types.TYPE_AMUSEMENT_PARK])

    # iterate over query results to get more detailed info

    """
	if query_result.has_next_page_token:
	    query_result_next_page = google_places.nearby_search(pagetoken=query_result.next_page_token)
	"""


def add_park_to_database():
    return


def add_snapshot_to_database():
    return


def add_city_to_database(city):
    db.session.merge(city)
    db.session.commit()

def cities_scrape():
    """
    scrape cities from seed file
    """

    cities_list = []
    with open("cities.txt", "r") as cities:
        for line in cities:
            cities_list.append(line)

    x = 0
    for city in cities_list:
        x += 1
        if x == 10:
            break

        name, longitude, latitude, uri = search_for_city(city)
        description = get_wikipedia_description(name)
        state = city.split(",")[1]
        state = state[1:-1]

        print(name)
        print(longitude)
        print(latitude)
        print(uri)
        print(description)
        print(state)
        print("\n\n")

        city_model = City(name=name, longitude=longitude, latitude=latitude, image_uri=uri, description=description, state=state, country="United States")

        add_city_to_database(city_model)


if __name__ == '__main__':
    cities_scrape()