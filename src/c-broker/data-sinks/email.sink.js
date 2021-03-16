const uuid = require('uuid');

exports.send = async function (message) {
    console.log('send EMAIL: ' + JSON.stringify(message));
    return uuid.v4();
}


