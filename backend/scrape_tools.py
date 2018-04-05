"""
"""

def format_name_for_wikipedia(name):
    name = name.replace(" ", "_")
    name = name.replace("\n", "")
    return name

def construct_uri(id, farm, server, secret):
    return "http://farm{}.staticflickr.com/{}/{}_{}.jpg".format(farm, server, id, secret)


if __name__ == '__main__':
	pass