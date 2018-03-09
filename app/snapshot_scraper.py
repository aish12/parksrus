from twitter import *
import json

consumer_key = "2LiTQouanD5FBcfgI7H5aY0SV"
consumer_secret = "G44DFgky7upaRww1H7geryCv36XtcfwxZEaMyE270noNa4ezU5"
access_token = "967928048019476481-gggKk3Paukw7Y7kpoI7dJMvKfUxD0ci"
access_secret = "3PT5ReYjfq4koviz3w8pFBAvG8djj41gBJk4LhcXyG4dx"

oauth = OAuth(access_token, access_secret, consumer_key, consumer_secret)

twitter_stream = TwitterStream(auth=oauth)
twitter = Twitter(auth=oauth)

num_file_entries = 3
def init_parks():
	parks_list = []
	with open("parks.txt", "r") as parks:
		count = num_file_entries
		for line in parks:
			if count >= 1:
				parks_list.append(line)
				count -= 1
	return parks_list

def init_cities():
	cities_list = []
	with open("cities.txt", "r") as cities:
		count = num_file_entries
		for line in cities:
			if count >= 1:
				cities_list.append(line)
				count -= 1
	return cities_list

def get_images(names_list):
	filters = " filter:images" #need to figure out how to add safe filter
	imgs_dict = {}
	for name in names_list:
		images = []
		it = twitter.search.tweets(q=name+filters,count=15, include_entities=True)
		num_entries = it['search_metadata']['count']
		#print (num_entries)
		print (name)
		for i in range (num_entries):
			cur_json = it['statuses'][i]
			if 'entities' in cur_json:
				#print ("More images exist!!")
				entities = cur_json['entities']
				if 'media' in entities:
					url = entities['media'][0]['media_url_https']
					if url not in images:
						images.append(url)
						print url
				else:
					#print "media doesn't exist?"
					if 'retweeted_status' in cur_json:
						retweeted_status = cur_json['retweeted_status']
						if 'media' in retweeted_status:
							url = ['entities']['media'][0]['media_url']
							if url not in images:
								images.append(url)
								print url
			else:
				url = it['statuses'][i]['retweeted_status']['entities']['media'][0]['media_url']
				if url not in images:
					images.append(url)
					print url
		imgs_dict[name] = images
	return imgs_dict


parks_list = init_parks()
cities_list = init_cities()

parks_images = get_images(parks_list)
cities_images = get_images(cities_list)
