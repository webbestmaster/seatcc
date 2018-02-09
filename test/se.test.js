/* global describe, it, before, after, beforeEach, afterEach, process */
const {assert} = require('chai');
const util = require('./../util/test-util');
const seUtil = require('./../util/se-util');
const mainData = require('./../main-data/data.json');
const addContext = require('mochawesome/addContext');
const {SeleniumServer} = require('selenium-webdriver/remote');

const envData = util.getEnvData();

const server = new SeleniumServer('./driver/selenium-server-standalone-3.6.0.jar', {
    port: envData.seServerPort,
    jvmArgs: util.getJvmArgs()
});

const WebDriver = require('selenium-webdriver');
const until = WebDriver.until;
const byCss = WebDriver.By.css;
let driver = null;

describe('Selenium test', () => {
    if (!envData.isMobile) {
        before(() => server.start());
    }

    after(() => server.stop());

    beforeEach(() => {
        driver = new WebDriver
            .Builder()
            .usingServer(envData.wdServerUrl)
            .withCapabilities(util.getCapabilities())
            .build();

        if (!envData.isMobile) {
            seUtil.screen.setSize(driver, 1024, 768);
        }
    });

    afterEach(() => driver.quit());

    const now = Date.now();

    it('Register', function Register() {
        driver.get(mainData.url.host);

        driver
            .findElement(byCss('a[href="/authorization"]')).click();

        driver.findElement(byCss('input[name="email"]')).sendKeys('test-user-' + now + '@gmail.com');
        // driver.findElement(byCss('input[name="password"]')).sendKeys('123456');

        driver.findElement(byCss('.js-register')).click();

        driver.wait(until.elementLocated(byCss('a[href="/api/logout"]')), 5e3)
            .then(elem => elem.isDisplayed())
            .then(isDisplayed => assert(isDisplayed, 'Element is NOT displayed'));

        seUtil.screen
            .ofSelector(driver, '.header')
            .then(image =>
                addContext(this, {
                    title: 'Header',
                    value: util.createTag('img', 'src="' + image + '"')
                })
            );

        return driver.sleep(1000);
    }).timeout(30e3);

/*
    it('Login', function Login() {
        driver.get(mainData.url.host);

        driver
            .findElement(byCss('a[href="/authorization"]')).click();

        driver.findElement(byCss('input[name="email"]')).sendKeys('test-user-' + now + '@gmail.com');
        driver.findElement(byCss('input[name="password"]')).sendKeys('123456');

        driver.findElement(byCss('.js-login')).click();

        driver.wait(until.elementLocated(byCss('a[href="/api/logout"]')), 5e3)
            .then(elem => elem.isDisplayed())
            .then(isDisplayed => assert(isDisplayed, 'Element is NOT displayed'));

        return driver.sleep(1000);
    }).timeout(30e3);
*/
});
