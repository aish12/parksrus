#!/usr/bin/env python3
'''
Dummy test file
for travis purposes '''

from unittest import main, TestCase

# -----------
# TestParks
# -----------


class TestParks(TestCase):
    '''
    dummy class
    '''
    def test_dummy(self):
        '''
        Dummy test file
        for travis purposes
        '''
        first = 1
        second = 1
        self.assertEqual(first, second)

# ----
# main
# ----

if __name__ == "__main__": #pragma: no cover
    main()
