const assert = require("chai").assert;
const request = require("request");
var chai = require("chai");
var expect = chai.expect;

describe("comm flow tests", () => {

  it("post random comms through communication api", (done) => {
    const xbroker = require("../src/x-broker-stream");
    const xnotificationApi = require("../src/x-communication-api");
    const xcontactApi = require("../src/x-contact-api");
    const xtemplateApi = require("../src/x-template-api");
    const xdistributionEmail = require("../src/x-distribution-email-stream");
    const xdistributionSms = require("../src/x-distribution-sms-stream");
    const xdistributionPush = require("../src/x-distribution-push-stream");

    const urlBase = 'http://localhost:3000';

    let channels = {
      0: 'my-sms-channel',
      1: 'my-email-channel',
      2: 'my-push-channel',
      3: 'my-inbound-channel',
    };

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    function sendComm() {
      var commRequest = {
        commTarget: {
          profileId: '0000-0001'
        },
        commDistribution: {
          channelId: channels[getRandomInt(4)]
        },
        commMessage: {
          templateId: 'my-template',
          templateParams: {
            greeting1: 'hola',
            greeting2: 'mundo'
          }
        }
      };

      request.post(
        {
          url : urlBase + "/communication",
          json: commRequest
        },
        function(error, response, body){
          console.log('commIds ' +  body.commIds);
          expect(response.statusCode).to.equal(200);
          expect(body).to.have.property('commIds');
        }
      );
    }

    setInterval(sendComm, 1000);
    setTimeout(done, 4000);

  });
});