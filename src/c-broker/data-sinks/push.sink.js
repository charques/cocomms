const uuid = require('uuid');

exports.send = async function (message) {
    console.log('send PUSH: ' + JSON.stringify(message));
    return uuid.v4();
}


