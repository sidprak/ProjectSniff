#!/usr/bin/env python

import pygeoip
import sys

if __name__ == '__main__':
    gic = pygeoip.GeoIP('/Applications/MAMP/htdocs/GeoIPCity.dat')
    data = gic.record_by_name(sys.argv[1])

    if data == None:
        sys.exit()

    print data['latitude']
    print data['longitude']
