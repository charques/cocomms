const redis = require('redis');
var brokerService = require('../services/broker.service');

exports.init = function init() {
    const subscriber = redis.createClient();
    
    subscriber.on("message", async (channel, communication) => {
        console.log("Channel :" + channel);
        console.log("Received communication :" + communication);

        let splitResult = await brokerService.split(JSON.parse(communication));

        console.log("splitResult " + splitResult);
    });

    subscriber.subscribe("comms-broker");
};