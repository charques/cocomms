const assert = require("chai").assert;
const axios = require('axios');
var chai = require("chai");
var expect = chai.expect;

describe("client activity flow tests", () => {

  it("client activity post", (done) => {
    const xclientEventApi = require("../src/x-client-event-api");
    
    const urlBase = 'http://localhost:3003';

    function sendActivity() {
      let appId = '0001';
      let eventType = 'log';

      var clientEventRequest = {
        myActivity: 'xxx'
      };

      let url = urlBase + '/client-event/' + appId + '/activity/' + eventType;
      const resp = axios.post(url, clientEventRequest);
      return resp.data;
    }

    setInterval(sendActivity, 1000);
    setTimeout(done, 10000)

  });
});