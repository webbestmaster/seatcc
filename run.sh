#!/usr/bin/env bash

browser=$1

case $browser in
    chrome)
        echo chrome browser
        SERVER_PORT=4444 IS_MOBILE="" ./run-pc-broeser-test.sh
    ;;

    ff)
        echo ff browser
    ;;

    opera)
        echo opera browser
    ;;

    android)
        echo android browser
    ;;

    *)
        echo pass browser type - chrome, ff, opera, android
esac

