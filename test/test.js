const assert = require("chai").assert;

describe("cocomms project", () => {

  it("comms-common source", (done) => {

    const commSharedSource = require("../src/c-broker/data-sources/comm-common.source");
    commSharedSource.init();

    const redis = require('redis');
    const publisher = redis.createClient();

    let types = {
        0: 'email',
        1: 'sms',
        2: 'push',
    };
    var  commRequest = {
        type : types[getRandomInt(3)],
        msg: "my-message " +  + Math.random()
    };
    setInterval( function() {
      publisher.publish("comms-common", commRequest)
    }, 10000);

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    });
});