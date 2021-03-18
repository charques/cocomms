const assert = require("chai").assert;
const request = require("request");
var chai = require("chai");
var expect = chai.expect;

describe("cocomms project", () => {

  it("communication api - single", (done) => {
    const xbroker = require("../src/x-broker");
    const xnotification = require("../src/x-communication");
    const xdistributionEmail = require("../src/x-distribution-email");
    const xdistributionSms = require("../src/x-distribution-sms");
    const xdistributionPush = require("../src/x-distribution-push");

    const urlBase = 'http://localhost:3000'

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    let types = {
      0: 'email',
      1: 'sms',
      2: 'push',
    };
    var  commRequest = {
      type : types[getRandomInt(3)],
      message: "my-message " +  + Math.random()
    };

    request.post(
      {
        url : urlBase + "/communication",
        json: commRequest
      },
      function(error, response, body){
        console.log(body.commId)
        expect(response.statusCode).to.equal(200);
        expect(body).to.have.property('commId');

        done();
      }
    );

  });

  /*it("comms-common source", (done) => {

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
    });*/
});