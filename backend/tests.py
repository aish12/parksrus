import unittest
from scrape_tools import construct_uri, format_name_for_wikipedia
import requests


class ParksRUsTests(unittest.TestCase):

    def setUp(self):
        self.site = "http://parksr.us"
        self.api = "http://api.parksr.us"

    # test the Flickr url generator for the snapshot scraper
    def test_flickr_url_generator(self):
        expected = "http://farm2.staticflickr.com/3/1_4.jpg"
        result = construct_uri(1, 2, 3, 4)
        self.assertEqual(expected, result)

    # test the Wikipedia formatter for the city scraper
    def test_wikipedia_formater(self):
        expected = "New_York"
        result = format_name_for_wikipedia("New York\n")
        self.assertEqual(expected, result)

    # test if main site up
    def test_site_up(self):
        r = requests.request("GET", self.site)
        self.assertEqual(r.ok, True)

    # test parks search endpoint
    def test_api_parks_up(self):
        r = requests.request("GET", self.api + "/parks")
        self.assertEqual(r.ok, True)

    # test cities search endpoint
    def test_api_cities_up(self):
        r = requests.request("GET", self.api + "/cities")
        self.assertEqual(r.ok, True)

    # test snapshots search endpoint
    def test_api_snapshots_up(self):
        r = requests.request("GET", self.api + "/snapshots")
        self.assertEqual(r.ok, True)

    # test parks specific instance
    def test_api_parks_instance_up(self):
        r = requests.request("GET", self.api + "/parks/1")
        self.assertEqual(r.ok, True)

    # test cities specific instance
    def test_api_cities_instance_up(self):
        r = requests.request("GET", self.api + "/cities/1")
        self.assertEqual(r.ok, True)

    # test snapshots specific instance
    def test_api_snapshots_instance_up(self):
        r = requests.request("GET", self.api + "/snapshots/1")
        self.assertEqual(r.ok, True)

    # test parks search endpoint
    def test_api_search_parks(self):
        r = requests.request("GET", self.api + "/search/parks?query=Houston")
        self.assertEqual(r.ok, True)

    # test cities search endpoint
    def test_api_search_cities(self):
        r = requests.request("GET", self.api + "/search/cities?query=Texas")
        self.assertEqual(r.ok, True)

    # test snapshots search endpoint
    def test_api_search_snapshots(self):
        r = requests.request(
            "GET", self.api + "/search/snapshots?query=losangeles")
        self.assertEqual(r.ok, True)

if __name__ == '__main__':
    print ("\n*** RUNNING UNIT TESTS (tests.py) *** \n")
    unittest.main()
