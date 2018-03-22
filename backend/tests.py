import unittest
from models import Park, City, Snapshot, db, app
import flickr_scraper
import city_scraper
import requests

class ParksRUsTests(unittest.TestCase):

	def setUp(self):
		self.site="http://parksr.us"
		self.api="http://api.parksr.us"

	def test_flickr_url_generator(self):
		expected = "http://farm2.staticflickr.com/3/1_4.jpg"
		result = flickr_scraper.construct_uri(1,2,3,4)
		self.assertEqual(expected, result)

	def test_wikipedia_formater(self):
		expected = "New_York"
		result = city_scraper.format_name_for_wikipedia("New York\n")
		self.assertEqual(expected, result)

	@unittest.expectedFailure
	def test_park_constructor_expected_fail(self):
		park = Park()

	def test_park_constructor_expected_pass(self):
		park = Park(name="test", longitude="1", latitude="2", website="test", review_data="5.0", image_uri="jpeg", phone_number="123456789")
		expected = ""
		result = park.state
		self.assertEqual(expected, result)

	def test_site_up(self):
		r = requests.request("GET", self.site)
		self.assertEqual(r.ok, True)

	def test_api_parks_up(self):
		r = requests.request("GET", self.api + "/parks")
		self.assertEqual(r.ok, True)

	def test_api_cities_up(self):
		r = requests.request("GET", self.api + "/cities")
		self.assertEqual(r.ok, True)

	def test_api_snapshots_up(self):
		r = requests.request("GET", self.api + "/snapshots")
		self.assertEqual(r.ok, True)

	def test_api_parks_instance_up(self):
		r = requests.request("GET", self.api + "/parks/1")
		self.assertEqual(r.ok, True)

	def test_api_cities_instance_up(self):
		r = requests.request("GET", self.api + "/cities/1")
		self.assertEqual(r.ok, True)

	def test_api_snapshots_instance_up(self):
		r = requests.request("GET", self.api + "/snapshots/1")
		self.assertEqual(r.ok, True)

if __name__ == '__main__':
	print ("\n*** RUNNING UNIT TESTS (tests.py) *** \n")
	unittest.main()