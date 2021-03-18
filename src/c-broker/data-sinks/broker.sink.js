const redis = require('redis');
const uuid = require('uuid');

const publisher = redis.createClient();

exports.send = async function (type, message) {
    let commRequest = {
        commId: uuid.v4(),
        type : type,
        message: message
    }
    console.log('send to Broker: ' + JSON.stringify(commRequest));

    publisher.publish("comms-common", JSON.stringify(commRequest));
    
    return commRequest.commId;
}


