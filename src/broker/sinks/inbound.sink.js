const redis = require('redis');

const publisher = redis.createClient();

exports.send = async function (communication) {
    console.log('send INBOUND: ' + JSON.stringify(communication));

    return publisher.publish("comms-inbound", JSON.stringify(communication));
}


