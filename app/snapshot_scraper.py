from twitter import *
import json

consumer_key = "2LiTQouanD5FBcfgI7H5aY0SV"
consumer_secret = "G44DFgky7upaRww1H7geryCv36XtcfwxZEaMyE270noNa4ezU5"
access_token = "967928048019476481-gggKk3Paukw7Y7kpoI7dJMvKfUxD0ci"
access_secret = "3PT5ReYjfq4koviz3w8pFBAvG8djj41gBJk4LhcXyG4dx"

oauth = OAuth(access_token, access_secret, consumer_key, consumer_secret)

twitter_stream = TwitterStream(auth=oauth)
twitter = Twitter(auth=oauth)

parks_list = []
with open("parks.txt", "r") as parks:
	count = 1
	for line in parks:
		if count >= 1:
			parks_list.append(line)
			count -= 1

filters = "&filter:images"
for park in parks_list:
	it = twitter.search.tweets(q=park+filters,count=1, include_entities=True)
	print (it['statuses'][0]['retweeted_status']['entities']['media'][0]['media_url'])