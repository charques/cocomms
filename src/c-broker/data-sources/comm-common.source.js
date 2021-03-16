const redis = require('redis');
var service = require('../services/broker.service')

exports.init = function init() {
    const subscriber = redis.createClient();
    var uuid = null;

    subscriber.on("message", async (channel, message) => {
        console.log("Channel :" + channel);
        console.log("Received data :" + message);
        uuid = await service.split(JSON.parse(message))
        console.log("uuid " + uuid);
    });

    subscriber.subscribe("comms-common");
}