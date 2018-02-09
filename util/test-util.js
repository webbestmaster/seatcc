/* global process */
const dot = require('dot');

const createTagGenerator = dot.template('<{{= it.tagName }} {{= it.attributes }}></{{= it.tagName }}>');

function createTag(tagName, attributes) {
    return createTagGenerator({tagName, attributes});
}

module.exports.createTag = createTag;


function getOsName() {
    const platformName = process.platform;

    if (/darwin/.test(platformName)) {
        return 'darwin';
    }

    if (/linux/.test(platformName)) {
        return 'linux';
    }

    throw new Error('Can NOT detect OS!');
}

module.exports.getOsName = getOsName;

/*
* To enable native events use webdriver.enable.native.events=1
* */
function getJvmArgs() {
    const browserName = process.env.BROWSER_NAME; // eslint-disable-line no-process-env
    const osName = getOsName();

    switch (browserName) {
        case 'android':
            return null;
        case 'chrome':
            return ['-Dwebdriver.chrome.driver=./driver/' + osName + '/chromedriver'];
        case 'ff':
            return ['-Dwebdriver.gecko.driver=./driver/' + osName + '/geckodriver'];
        case 'opera':
            return ['-Dwebdriver.opera.driver=./driver/' + osName + '/operadriver'];

        default:
            throw new Error('Not support browser with name: ' + browserName);
    }
}

module.exports.getJvmArgs = getJvmArgs;


function getCapabilities() {
    const browserName = process.env.BROWSER_NAME; // eslint-disable-line no-process-env

    switch (browserName) {
        case 'android':
        case 'chrome':
            return {browserName: 'chrome', chromeOptions: {args: ['--disable-extensions', '--disable-infobars']}};
        case 'ff':
            return {browserName: 'firefox'};
        case 'opera':
            return {browserName: 'opera', operaOptions: {binary: '/usr/bin/opera'}};

        default:
            throw new Error('Not support browser with name: ' + browserName);
    }
}

module.exports.getCapabilities = getCapabilities;


function getEnvData() {
    const seServerPort = parseInt(process.env.SE_SERVER_PORT, 10); // eslint-disable-line no-process-env

    return {
        isMobile: Boolean(process.env.IS_MOBILE), // eslint-disable-line no-process-env
        wdServerUrl: 'http://localhost:' + seServerPort + '/wd/hub'
    };
}

module.exports.getEnvData = getEnvData;


function getSeleniumServerArgs() {
    const seServerPort = parseInt(process.env.SE_SERVER_PORT, 10); // eslint-disable-line no-process-env

    return [
        './driver/selenium-server-standalone-3.9.1.jar',
        {
            port: seServerPort,
            jvmArgs: getJvmArgs()
        }
    ];
}

module.exports.getSeleniumServerArgs = getSeleniumServerArgs;
