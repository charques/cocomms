const redis = require('redis');

const publisher = redis.createClient();

exports.send = async function (communication) {
    console.log('send PUSH: ' + JSON.stringify(communication));

    return publisher.publish("comms-push", JSON.stringify(communication));
}


