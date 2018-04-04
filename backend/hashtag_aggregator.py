"""
creates a list of all hashtags
"""
from models import Snapshot, Park, City, db, app
import json

def get_tags():
	tag_set = set()
	snapshots = db.session.query(Snapshot).all()

    for snapshot in snapshots:
        tags = snapshot.tags.split(',')
        for tag in tags:
        	tag_set.add(tag)

    return tag_set

def main():
	tags = list(get_tags())
	with open("tags.json", "w") as outfile:
		json.dump(tags, outfile)

if __name__ == '__main__':
	main()

