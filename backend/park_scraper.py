"""
scraper to get park data for each city in the database
"""
from googleplaces import GooglePlaces, types, lang
from models import Park, City, db, app
from flask import jsonify
import re
import requests
import os
import json
import time

GOOGLE_API_KEY = os.environ['GOOGLE_PLACES_KEY']

google_places = GooglePlaces(GOOGLE_API_KEY)


def search_parks(location_name):
    park_list = []

    query_result = google_places.nearby_search(
        location=location_name,
        radius=50000, types=[types.TYPE_AMUSEMENT_PARK])

    for place in query_result.places:
        place.get_details()
        lon = place.geo_location['lng']
        lat = place.geo_location['lat']

        # only go further if the place has > 0 images
        if len(place.photos) < 1:
            continue

        photo = place.photos[0]
        photo.get(maxheight=500, maxwidth=500)

        # values we do not allow to be N/A
        if place.international_phone_number == None or place.website == None or place.formatted_address == None:
            continue

        park_name = place.name.encode("UTF8")
        park_phone_number = place.international_phone_number.encode("UTF8")
        website = place.website.encode("UTF8")
        address = place.formatted_address.encode("UTF8")

        park = Park(
            name=park_name, address=address, longitude=str(lon), latitude=str(lat),
                    phone_number=park_phone_number, review_data=str(place.rating), image_uri=str(photo.url), website=website)

        park_list.append(park)

        # thread sleep to avoid rate limits
        time.sleep(1)

    return park_list


def get_parks_for_cities():
    cities = db.session.query(City).all()

    for city in cities:
        if db.session.query(Park).filter(Park.city_id == city.id).count() == 0:
            print (city)
            park_list = search_parks(city.name + ", " + city.state)
            for park in park_list:
                park.set_city_id(city.id)
                park.set_state(city.state)
                park.set_country(city.country)
                db.session.merge(park)
                db.session.commit()
            # thread sleep to avoid rate limits
            time.sleep(1)


def main():
    park_list = search_parks("Orlando, Florida")
    for park in park_list:
        print(park.name)
        print(park.website)
        print(park.address)
        print(park.description)
        print(park.review_data)
        print(park.longitude)
        print(park.latitude)
        print(park.phone_number)
        print(park.image_uri)
        print(park.state)
        print(park.country)
        print("\n")

if __name__ == '__main__':
    get_parks_for_cities()
