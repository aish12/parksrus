#!/usr/bin/env python

"""
Selenium tests
"""
from selenium import webdriver
#from selenium.webdriver.common.by import By
#from selenium.webdriver.common.keys import Keys
#from selenium.webdriver.support.ui import Select
import unittest
import time
import re


class SeleniumTests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome(executable_path=r'chromedriver.exe')
        self.site = "http://parksr.us"

    def test_parks_page(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Parks').click()
        self.assertEqual("http://parksr.us/parks", driver.current_url)

    def test_parks_instance(self):
        '''driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Parks').click()
        self.assertEqual("http://parksr.us/parks", driver.current_url)

        time.sleep(1)

        park_instance = driver.find_element_by_xpath("//*[@id="root"]/div/div/div/div[1]/div/div[1]/a")

        park_instance.click()
        self.assertEqual("http://parksr.us/parks/1", driver.current_url)'''
        pass
            

    def test_cities_page(self):
        driver = self.driver
        driver.get(self.site)
        
        driver.find_element_by_link_text('Cities').click()
        self.assertEqual("http://parksr.us/cities", driver.current_url)

    def test_cities_instance(self):
        '''driver = self.driver
        driver.get(self.site)
        
        driver.find_element_by_link_text('Cities').click()
        self.assertEqual("http://parksr.us/cities", driver.current_url)

        time.sleep(1)

        city_instance = driver.find_element_by_xpath("//*[@id="root"]/div/div/div/div[1]/div/div[1]/a")

        city_instance.click()
        self.assertEqual("http://parksr.us/cities/1", driver.current_url)'''
        pass

    def test_snapshots_page(self):
        driver = self.driver
        driver.get(self.site)
        
        driver.find_element_by_link_text('Snapshots').click()
        self.assertEqual("http://parksr.us/snapshots", driver.current_url)

    def test_snapshots_instance(self):
        '''driver = self.driver
        driver.get(self.site)
        
        driver.find_element_by_link_text('Snapshots').click()
        self.assertEqual("http://parksr.us/snapshots", driver.current_url)

        time.sleep(1)

        snapshot_instance = driver.find_element_by_xpath("//*[@id="root"]/div/div/div/div[1]/div/div[1]/a")

        snapshot_instance.click()
        self.assertEqual("http://parksr.us/snapshots/1", driver.current_url)'''
        pass

    def test_about_page(self):
        driver = self.driver
        driver.get(self.site)
        
        driver.find_element_by_link_text('About').click()
        self.assertEqual("http://parksr.us/about", driver.current_url)

    def test_navigation_bar(self):
        driver = self.driver
        driver.get(self.site)

        time.sleep(1)

        driver.find_element_by_link_text('Parks').click()
        self.assertEqual("http://parksr.us/parks", driver.current_url)

        time.sleep(1)

        driver.find_element_by_link_text('Cities').click()
        self.assertEqual("http://parksr.us/cities", driver.current_url)

        time.sleep(1)

        driver.find_element_by_link_text('Snapshots').click()
        self.assertEqual("http://parksr.us/snapshots", driver.current_url)

        time.sleep(1)

        driver.find_element_by_link_text('About').click()
        self.assertEqual("http://parksr.us/about", driver.current_url)

    def test_pagination(self):
        driver = self.driver
        driver.get(self.site)
        pass

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
	unittest.main(verbosity=2)
