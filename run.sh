#!/usr/bin/env bash

browser=$1
browserServerPort=4444

case $browser in
    chrome)
        echo chrome browser
        BROWSER_NAME=$browser SE_SERVER_PORT=$browserServerPort IS_MOBILE="" ./run-pc-test.sh
    ;;

    ff)
        echo ff browser
        BROWSER_NAME=$browser SE_SERVER_PORT=$browserServerPort IS_MOBILE="" ./run-pc-test.sh
    ;;

    opera)
        echo opera browser
        BROWSER_NAME=$browser SE_SERVER_PORT=$browserServerPort IS_MOBILE="" ./run-pc-test.sh
    ;;

    android)
        echo android browser
        BROWSER_NAME=$browser IS_MOBILE=1 ./run-mobile-list-test.sh
    ;;

    *)
        echo pass browser type - chrome, ff, opera or android
esac

