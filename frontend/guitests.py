#!/usr/bin/env python

"""
Selenium tests
"""
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.ui import Select
import unittest
import time
import re


class SeleniumTests(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.site = "http://parksr.us"

    # test park link from home page
    def test_parks_page(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Parks').click()
        self.assertEqual(
            "http://parksr.us/#/parks/pages/1", driver.current_url)

    # test one instance of parks model
    def test_parks_instance(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Parks').click()
        self.assertEqual(
            "http://parksr.us/#/parks/pages/1", driver.current_url)

        time.sleep(1)

        park_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")

        park_instance.click()
        self.assertEqual("http://parksr.us/#/parks/1", driver.current_url)

        time.sleep(1)

        driver.back()
        self.assertEqual(
            "http://parksr.us/#/parks/pages/1", driver.current_url)

        time.sleep(1)

        driver.forward()
        self.assertEqual("http://parksr.us/#/parks/1", driver.current_url)

    # test city link from home page
    def test_cities_page(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Cities').click()
        self.assertEqual(
            "http://parksr.us/#/cities/pages/1", driver.current_url)

    # test one instance of cities model
    def test_cities_instance(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Cities').click()
        self.assertEqual(
            "http://parksr.us/#/cities/pages/1", driver.current_url)

        time.sleep(1)

        city_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")

        city_instance.click()
        self.assertEqual("http://parksr.us/#/cities/1", driver.current_url)

        time.sleep(1)

        driver.back()
        self.assertEqual(
            "http://parksr.us/#/cities/pages/1", driver.current_url)

        time.sleep(1)

        driver.forward()
        self.assertEqual("http://parksr.us/#/cities/1", driver.current_url)

    # test snapshot link from home page
    def test_snapshots_page(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Snapshots').click()
        self.assertEqual(
            "http://parksr.us/#/snapshots/pages/1", driver.current_url)

    # test one instance of snapshots model
    def test_snapshots_instance(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Snapshots').click()
        self.assertEqual(
            "http://parksr.us/#/snapshots/pages/1", driver.current_url)

        time.sleep(1)

        snapshot_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")

        snapshot_instance.click()
        self.assertEqual("http://parksr.us/#/snapshots/1", driver.current_url)

        time.sleep(1)

        driver.back()
        self.assertEqual(
            "http://parksr.us/#/snapshots/pages/1", driver.current_url)

        time.sleep(1)

        driver.forward()
        self.assertEqual("http://parksr.us/#/snapshots/1", driver.current_url)

    # test about page link from home page
    def test_about_page(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('About').click()
        self.assertEqual("http://parksr.us/#/about", driver.current_url)

    # test navigation bar links
    def test_navigation_bar(self):
        driver = self.driver
        driver.get(self.site)

        time.sleep(1)

        driver.find_element_by_link_text('Parks').click()
        self.assertEqual(
            "http://parksr.us/#/parks/pages/1", driver.current_url)

        time.sleep(1)

        driver.find_element_by_link_text('Cities').click()
        self.assertEqual(
            "http://parksr.us/#/cities/pages/1", driver.current_url)

        time.sleep(1)

        driver.find_element_by_link_text('Snapshots').click()
        self.assertEqual(
            "http://parksr.us/#/snapshots/pages/1", driver.current_url)

        time.sleep(1)

        driver.find_element_by_link_text('About').click()
        self.assertEqual("http://parksr.us/#/about", driver.current_url)

    # test general navigation from parks page
    def test_back_and_forward_parks(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Parks').click()
        self.assertEqual(
            "http://parksr.us/#/parks/pages/1", driver.current_url)

        time.sleep(1)

        driver.back()
        self.assertEqual("http://parksr.us/#/", driver.current_url)

        time.sleep(1)

        driver.forward()
        self.assertEqual(
            "http://parksr.us/#/parks/pages/1", driver.current_url)

        time.sleep(1)

        driver.refresh()
        self.assertEqual(
            "http://parksr.us/#/parks/pages/1", driver.current_url)

    # test general navigation from cities page
    def test_back_and_forward_cities(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Cities').click()
        self.assertEqual(
            "http://parksr.us/#/cities/pages/1", driver.current_url)

        time.sleep(1)

        driver.back()
        self.assertEqual("http://parksr.us/#/", driver.current_url)

        time.sleep(1)

        driver.forward()
        self.assertEqual(
            "http://parksr.us/#/cities/pages/1", driver.current_url)

        time.sleep(1)

        driver.refresh()
        self.assertEqual(
            "http://parksr.us/#/cities/pages/1", driver.current_url)

    # test general navigation from snapshots page
    def test_back_and_forward_snapshots(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('Snapshots').click()
        self.assertEqual(
            "http://parksr.us/#/snapshots/pages/1", driver.current_url)

        time.sleep(1)

        driver.back()
        self.assertEqual("http://parksr.us/#/", driver.current_url)

        time.sleep(1)

        driver.forward()
        self.assertEqual(
            "http://parksr.us/#/snapshots/pages/1", driver.current_url)

        time.sleep(1)

        driver.refresh()
        self.assertEqual(
            "http://parksr.us/#/snapshots/pages/1", driver.current_url)

    # test general navigation from about page
    def test_back_and_forward_about(self):
        driver = self.driver
        driver.get(self.site)

        driver.find_element_by_link_text('About').click()
        self.assertEqual("http://parksr.us/#/about", driver.current_url)

        time.sleep(1)

        driver.back()
        self.assertEqual("http://parksr.us/#/", driver.current_url)

        time.sleep(1)

        driver.forward()
        self.assertEqual("http://parksr.us/#/about", driver.current_url)

        time.sleep(1)

        driver.refresh()
        self.assertEqual("http://parksr.us/#/about", driver.current_url)

    # test pagination using next/prev/first/last for parks
    def test_pagination_parks(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text('Parks').click()

        time.sleep(1)

        driver.find_element_by_link_text('2').click()
        self.assertEqual(
            "http://parksr.us/#/parks/pages/2", driver.current_url)

        time.sleep(1)

        driver.find_element_by_link_text('3').click()
        self.assertEqual(
            "http://parksr.us/#/parks/pages/3", driver.current_url)

        time.sleep(1)

    # test pagination for cities
    def test_pagination_cities(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text('Cities').click()

        time.sleep(1)

        driver.find_element_by_xpath("//a[@href='#/cities/pages/2']").click()
        self.assertEqual(
            "http://parksr.us/#/cities/pages/2", driver.current_url)

        time.sleep(1)

        driver.find_element_by_xpath("//a[@href='#/cities/pages/3']").click()
        self.assertEqual(
            "http://parksr.us/#/cities/pages/3", driver.current_url)

        time.sleep(1)

    # test pagination for snapshots
    def test_pagination_snapshots(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text('Snapshots').click()

        time.sleep(1)

        driver.find_element_by_link_text('2').click()
        self.assertEqual(
            "http://parksr.us/#/snapshots/pages/2", driver.current_url)

        time.sleep(1)

        driver.find_element_by_link_text('3').click()
        self.assertEqual(
            "http://parksr.us/#/snapshots/pages/3", driver.current_url)

        time.sleep(1)

    # test filtering parks by state using Arizona
    def test_filter_parks_by_state(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text('Parks').click()

        time.sleep(1)

        driver.find_element_by_class_name('Select-placeholder').click()

        time.sleep(1)

        filter_element = driver.find_element_by_xpath(
            "//input[@aria-activedescendant='react-select-2--option-0']")
        filter_element.send_keys('Arizona')
        filter_element.send_keys(Keys.RETURN)

        time.sleep(1)

        park_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")
        park_instance.click()

        time.sleep(1)

        self.assertEqual("http://parksr.us/#/parks/58", driver.current_url)

    # test filter parks by city using Los Angeles
    def test_filter_parks_by_city(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text('Parks').click()

        time.sleep(1)

        driver.find_element_by_xpath(
            "(//div[@class='Select-placeholder'])[2]").click()

        time.sleep(1)

        sort_element = driver.find_element_by_xpath("(//input)[2]")
        sort_element = sort_element
        sort_element.send_keys('Los Angeles')
        sort_element.send_keys(Keys.RETURN)

        time.sleep(1)

        park_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")
        park_instance.click()

        time.sleep(1)

        self.assertEqual("http://parksr.us/#/parks/1", driver.current_url)

    # test filtering cities by state using Arizona
    def test_filter_cities(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text('Cities').click()

        time.sleep(1)

        filter_element = driver.find_element_by_class_name(
            'Select-placeholder')
        filter_element.click()

        time.sleep(1)

        filter_element = driver.find_element_by_class_name(
            "Select-input>input")
        filter_element.send_keys('Arizona')
        filter_element.send_keys(Keys.RETURN)

        time.sleep(1)

        city_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")
        city_instance.click()

        time.sleep(1)

        self.assertEqual("http://parksr.us/#/cities/4", driver.current_url)

    # test sorting parks by reviews
    def test_sort_parks(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text('Parks').click()

        time.sleep(1)

        driver.find_element_by_xpath(
            "(//div[@class='Select-placeholder'])[3]").click()

        time.sleep(1)

        sort_element = driver.find_element_by_xpath("(//input)[3]")
        sort_element = sort_element
        sort_element.send_keys('review_data')
        sort_element.send_keys(Keys.RETURN)

        time.sleep(1)

        park_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")
        park_instance.click()

        time.sleep(1)

        self.assertEqual("http://parksr.us/#/parks/202", driver.current_url)

    # test sorting cities by number of parks
    def test_sort_cities(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text('Cities').click()

        time.sleep(1)

        driver.find_element_by_xpath(
            "(//div[@class='Select-placeholder'])[3]").click()

        time.sleep(1)

        sort_element = driver.find_element_by_xpath("(//input)[3]")
        sort_element = sort_element
        sort_element.send_keys('num_parks')
        sort_element.send_keys(Keys.RETURN)

        time.sleep(1)

        city_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")
        city_instance.click()

        time.sleep(1)

        self.assertEqual("http://parksr.us/#/cities/18", driver.current_url)

    # test sorting snapshots by number of views
    def test_sort_snapshots(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text('Snapshots').click()

        time.sleep(1)

        driver.find_element_by_xpath(
            "(//div[@class='Select-placeholder'])[2]").click()

        time.sleep(1)

        sort_element = driver.find_element_by_xpath("(//input)[2]")
        sort_element = sort_element
        sort_element.send_keys('views')
        sort_element.send_keys(Keys.RETURN)

        time.sleep(1)

        snapshot_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")
        snapshot_instance.click()

        time.sleep(1)

        self.assertEqual(
            "http://parksr.us/#/snapshots/652", driver.current_url)

    # test search by searching for Arizona
    def test_search(self):
        driver = self.driver
        driver.get(self.site)
        driver.find_element_by_link_text("Search").click()

        time.sleep(1)

        search_element = driver.find_element_by_class_name("form-control")
        search_element.click()
        search_element.send_keys('Arizona')

        time.sleep(1)

        search_instance = driver.find_element_by_xpath(
            "//*[@id='root']/div/div/div/div[1]/div/div[1]/a")
        search_instance.click()

        time.sleep(1)

        self.assertEqual(
            "http://parksr.us/#/cities/32", driver.current_url)

    def tearDown(self):
        self.driver.close()


if __name__ == '__main__':
    unittest.main(verbosity=2)
