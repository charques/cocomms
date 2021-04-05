const redis = require('redis');
const publisher = redis.createClient();

let types = {
    0: 'email',
    1: 'sms',
    2: 'push',
};
var commRequest = null;

setInterval(() => {
    commRequest = {
        type : types[getRandomInt(3)],
        msg: "my-message " + Math.random()
    };
    publisher.publish("comms-common", JSON.stringify(commRequest));
}, 1000);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}