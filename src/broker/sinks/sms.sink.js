const redis = require('redis');

const publisher = redis.createClient();

exports.send = async function (communication) {
    console.log('send SMS: ' + JSON.stringify(communication));

    return publisher.publish("comms-sms", JSON.stringify(communication));
}


