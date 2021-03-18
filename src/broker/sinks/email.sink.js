const redis = require('redis');

const publisher = redis.createClient();

exports.send = async function (communication) {
    console.log('send EMAIL: ' + JSON.stringify(communication));

    return publisher.publish("comms-email", JSON.stringify(communication));
}


