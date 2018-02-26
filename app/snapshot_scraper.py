from twitter import *
import json

consumer_key = "2LiTQouanD5FBcfgI7H5aY0SV"
consumer_secret = "G44DFgky7upaRww1H7geryCv36XtcfwxZEaMyE270noNa4ezU5"
access_token = "967928048019476481-gggKk3Paukw7Y7kpoI7dJMvKfUxD0ci"
access_secret = "3PT5ReYjfq4koviz3w8pFBAvG8djj41gBJk4LhcXyG4dx"

oauth = OAuth(access_token, access_secret, consumer_key, consumer_secret)

twitter_stream = TwitterStream(auth=oauth)

it = twitter_stream.statuses.sample()

tweet_count = 5
for tweet in it:
	tweet_count -= 1
	print (json.dumps(tweet))
	if tweet_count <= 0:
		break