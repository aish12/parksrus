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

def filter_tags():

	snapshots = db.session.query(Snapshot).all()
	for snapshot in snapshots:
		tags = snapshot.tags.split(',')
		new_tags = []
		for tag in tags:
			if not omit(tag):
				new_tags.append(tag)
		snapshot.set_tags(','.join(new_tags))
		db.session.merge(snapshot)
        db.session.commit()

def omit(tag):
	omitted =frozenset("uploaded:by=instagram", "instagram", "foursquare", "square", "flickstagram")
	for word in omitted:
		if word in tag:
			return True
	return False

def main():
	tags = list(get_tags())
	with open("tags.json", "w+") as outfile:
		json.dump(tags, outfile)

if __name__ == '__main__':
	filter_tags()
	main()

