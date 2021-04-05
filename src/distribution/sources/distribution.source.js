const redis = require('redis');
var distributionService = require('../services/distribution.service');

exports.init = function(distributionType) {
    const subscriber = redis.createClient();
    
    const channelName = 'comms-' + distributionType;

    subscriber.on("message", async (channel, communication) => {
        console.log("Channel :" + channel);
        console.log("Received " + distributionType + ": " + communication);
        let distributeResult = await distributionService.distribute(distributionType, JSON.parse(communication));
        console.log("distributeResult " + distributeResult);
    });

    subscriber.subscribe(channelName);
};