/* global process */
const fs = require('fs'); // eslint-disable-line id-length
// const dot = require('dot');

// const createTagGenerator = dot.template('<{{= it.tagName }} {{= it.attributes }}></{{= it.tagName }}>');
function getOsName() {
    const {platform} = process;

    if (/darwin/.test(platform)) {
        return 'darwin';
    }

    if (/linux/.test(platform)) {
        return 'linux';
    }

    throw new Error('Can NOT detect OS!');
}

module.exports.getOsName = getOsName;


function getOsArch() {
    const {arch} = process;

    return arch;
}


module.exports.getOsArch = getOsArch;
