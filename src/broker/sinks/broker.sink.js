const redis = require('redis');

const publisher = redis.createClient();

exports.send = async function (type, communication) {
    console.log('send ' + type + ': ' + JSON.stringify(communication));

    return publisher.publish('comms-' + type, JSON.stringify(communication));
};
