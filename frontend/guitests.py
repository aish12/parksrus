"""
Selenium tests
"""
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import unittest
import time
import re

class SeleniumTests(unittest.TestCase):

	def setUp(self):
		self.driver = webdriver.Chrome()
		self.site = "http://parksr.us"

	def test_parks_page(self):
		driver = self.driver
		driver.get(self.site)

		driver.find_element_by_link_text('Parks').click()
		self.assertEqual("http://parksr.us/parks", driver.current_url)

	def test_parks_instance(self):
		driver = self.driver
		driver.get(self.site)
		
		pass

	def test_cities_page(self):
		driver = self.driver
		driver.get(self.site)
		
		driver.find_element_by_link_text('Cities').click()
		self.assertEqual("http://parksr.us/cities", driver.current_url)

	def test_cities_instance(self):
		driver = self.driver
		driver.get(self.site)
		pass

	def test_snapshots_page(self):
		driver = self.driver
		driver.get(self.site)
		
		driver.find_element_by_link_text('Snapshots').click()
		self.assertEqual("http://parksr.us/snapshots", driver.current_url)

	def test_snapshots_instance(self):
		driver = self.driver
		driver.get(self.site)
		pass

	def test_about_page():
		driver = self.driver
		driver.get(self.site)
		
		driver.find_element_by_link_text('About').click()
		self.assertEqual("http://parksr.us/about", driver.current_url)

	def test_navigation(self):
		driver = self.driver
		driver.get(self.site)
		pass

	def test_pagination(self):
		driver = self.driver
		driver.get(self.site)
		pass

	def tearDown(self):
		self.driver.close()


if __name__ == '__main__':
	unittest.main()