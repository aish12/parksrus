import unittest
from models import Park, City, Snapshot
import flickr_scraper
import city_scraper


class ParksRUsTests(unittest.TestCase):

	def test_1(self):
		expected = "http://farm2.staticflickr.com/3/1_4.jpg"
		result = flickr_scraper.construct_uri(1,2,3,4)
		self.assertEqual(expected, result)

	def test_2(self):
		expected = "New_York"
		result = city_scraper.format_name_for_wikipedia("New York\n")
		self.assertEqual(expected, result)

	@unittest.expectedFailure
	def test_3(self):
		park = Park()

	def test_4(self):
		park = Park(name="test", longitude="1", latitude="2", website="test", review_data="5.0", image_uri="jpeg", phone_number="123456789")
		expected = ""
		result = park.state
		self.assertEqual(expected, result)

	def test_5(self):
		pass

	def test_6(self):
		pass

if __name__ == '__main__':
    unittest.main()
