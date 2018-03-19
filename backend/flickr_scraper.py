"""
Snapshot scraper with the Flickr API
"""
import re
import requests
import os
import json
import xmltodict
from datetime import datetime
from models import Snapshot, Park, City, db, app

FLICKR_API_KEY = os.environ['FLICKR_API_KEY']

def construct_uri(id, farm, server, secret):
    return "http://farm{}.staticflickr.com/{}/{}_{}.jpg".format(farm, server, id, secret)

def image_search(lat, lon):
    return get_photos_geo(lat, lon)

def get_photos_geo(lat, lon, max_num=1):
    snapshot_list = []
    url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search'
    querystring = {"api_key": FLICKR_API_KEY, "lat":
        lat, "lon": lon, "radius": "0.1", "format": "rest"}
    headers = {'cache-control': "no-cache", }
    response = requests.request("GET", url, headers=headers, params=querystring)
    
    xml = xmltodict.parse(response.content)
    json_string= json.dumps(xml)
    json_data = json.loads(json_string)

    counter = 0

    photos = json_data['rsp']['photos']['photo']
    for photo in photos:

        try:
            id = photo['@id']
            farm = photo['@farm']
            server = photo['@server']
            secret = photo['@secret']

            image_uri = construct_uri(id, farm, server, secret)
            tags, date, views = get_photo_metadata(id)

            datetime_obj = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")

            s = Snapshot(image_uri=image_uri, views=views, date=datetime_obj, tags=tags)

            snapshot_list.append(s)
        except:
            continue

        counter = counter + 1

        if counter == max_num:
            break

    return snapshot_list

def get_photo_metadata(id):
    tag_list = []
    url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo'
    querystring = {"api_key":FLICKR_API_KEY, "photo_id":id, "format":"rest"}

    headers = {'cache-control': "no-cache",}

    response = requests.request("GET", url, headers=headers, params=querystring)
    xml = xmltodict.parse(response.content)
    json_string= json.dumps(xml)
    json_data = json.loads(json_string)

    metadata = json_data['rsp']['photo']

    tags = metadata['tags']['tag']
    views = metadata['@views']
    date = metadata['dates']['@taken']

    for tag in tags:
        tag_list.append(tag['#text'].encode("UTF8"))

    tags = ','.join(tag_list)

    return (tags, date, views)

def main():
    parks = db.session.query(Park).all()

    for park in parks:
        if db.session.query(Snapshot).filter(Snapshot.park_id == park.id).count() == 0:
            print (park)
            snapshot_list = image_search(park.latitude, park.longitude)
            for snapshot in snapshot_list:
                snapshot.set_city_id(park.city_id)
                snapshot.set_park_id(park.id)
                snapshot.set_latitude(park.latitude)
                snapshot.set_longitude(park.longitude)
                db.session.merge(snapshot)
                db.session.commit()

def test():
    # image search for universal studios
    # s = get_photos_geo('34.13811680000001', '-118.3533783', 10)

    s = get_photos_geo('47.6236791', '-122.5174713', 10)
    for snap in s:
        print(snap.image_uri)

if __name__ == '__main__':
    main()
    #test()