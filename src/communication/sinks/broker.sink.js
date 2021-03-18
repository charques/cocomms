const redis = require('redis');

const publisher = redis.createClient();

exports.send = async function (communication) {
    console.log('publish to broker: ' + JSON.stringify(communication));
    publisher.publish("comms-broker", JSON.stringify(communication));
    
    return communication.commId;
}


