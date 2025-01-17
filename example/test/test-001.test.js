/* global describe, it, before, after, beforeEach, afterEach, process, document */

/* eslint-disable id-match, handle-callback-err, max-nested-callbacks, no-shadow */

const WebDriver = require('selenium-webdriver');
const until = WebDriver.until;
const SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
const SERVER_PORT = 4444;

const server = new SeleniumServer('./driver/selenium-server-standalone-3.9.1.jar', {
    port: SERVER_PORT,
    jvmArgs: ['-Dwebdriver.chrome.driver=./driver/linux/chromedriver']
});

describe('test describe', function exampleTest() {
    let driver = null;

    before(() => server.start());

    after(() => server.stop());

    beforeEach(() => {
        driver = new WebDriver
            .Builder()
            .usingServer('http://localhost:' + SERVER_PORT + '/wd/hub')
            .withCapabilities({
                browserName: 'chrome',
                chromeOptions: {args: ['--disable-extensions', '--disable-infobars']}
            })
            .build();
    });

    afterEach(() => driver.quit());

    /*
        it('test it', () => {
            driver.get('https://google.com/');

            driver.wait(() => {
                console.log('wait for Math.random() > 0.95');
                return Math.random() > 0.9;
            }, 10e3);

            driver.findElement(WebDriver.By.css('#lst-ib')).sendKeys('username');
            driver.findElement(WebDriver.By.css('#lst-ib')).sendKeys(WebDriver.Key.ENTER);

            driver.sleep(2e3);

            driver.findElement(WebDriver.By.css('#lst-ib')).sendKeys(WebDriver.Key.CONTROL + 'a');
            driver.findElement(WebDriver.By.css('#lst-ib')).sendKeys('webdriver');

            driver.sleep(5e3);

            driver.get('https://statlex.github.com/');

            return driver.get('https://yandex.com/');
        });
    */

    it('test it', () => {
        driver.get('http://localhost:9080/'); // ./index.html

        driver.sleep(1e3);
        driver.findElement(WebDriver.By.css('#tag')).click().catch(evt => {
            console.log('can not click, too far');
        });

        let chain = Promise.resolve();

        ['#no-exist', '#tag', '#none', '#zero', '#far'].forEach(selector => {
            chain = chain.then(() => {
                return driver.wait(until.elementLocated(WebDriver.By.css(selector)), 1e3)
                    .then(elem => {
                        console.log('//----', selector, '----\\\\');
                        console.log(selector, '- is good for until.elementLocated');
                        return elem;
                    })
                    .catch(err => {
                        console.error(selector, '- is not for until.elementLocated');
                    })
                    .then(elem => {
                        return elem && Promise.all([
                            driver.wait(until.elementIsVisible(elem), 1e3)
                                .then(elem => {
                                    console.log(selector, '- is good for until.elementIsVisible');
                                })
                                .catch(err => {
                                    console.error(selector, '- is not for until.elementIsVisible');
                                }),

                            elem.isDisplayed().then(isDisplayed => {
                                if (isDisplayed) {
                                    console.log(selector, '- is', isDisplayed, 'for elem.isDisplayed()');
                                } else {
                                    console.error(selector, '- is', isDisplayed, 'for elem.isDisplayed()');
                                }
                            })
                        ]);
                    });
            });
        });

        return chain.then(() => {
            console.log('--- other methods ---');

            driver
                .findElement(WebDriver.By.css('#tag'))
                .then(elem => elem.getAttribute('innerHTML'))
                .then(html => console.log(html));

            driver
                .executeScript(() => document.querySelector('#tag').outerHTML)
                .then(html => console.log(html));

            return driver.sleep(2e3);
        });
    }).timeout(10e3);
});
