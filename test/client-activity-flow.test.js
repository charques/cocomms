const assert = require("chai").assert;
const axios = require('axios');
const chai = require("chai");
const uuid = require('uuid');
var expect = chai.expect;

describe("client activity flow tests", () => {

  it("tracing activity post", (done) => {
    const xclientEventApi = require("../src/x-client-event-api");

    const urlBase = 'http://localhost:3003';
  
    let clientd = '0001-0001';
    let activityType = 'tracing';
  
    var exceptionEvent = {
      eventId: uuid.v4(), // Hexadecimal string representing a uuid4 value
      timestamp: Date.now(), // Indicates when the event
      platform: 'web', //[web, ios, android] - A string representing the platform
      level: 'error', //[fatal, error, warning, info, debug] - Optional. The record severity.
      logger: 'my.logger.name', // Optional. The name of the logger which created the record.
      transaction: '/users/<username>/', // Optional. The name of the transaction which caused this exception.
      domainName: "foo.example.com", // Optional. Identifies the host from which the event was recorded.
      release: "my-project-name@1.0.0", // Optional. The release version of the application.
      dist: "14G60", // Optional. The distribution of the application.
      tags: { "ios_version": "4.0", "context": "production" }, // Optional. A map or list of tags for this event.
      metadata: {}, // Optional. An arbitrary mapping of additional metadata to store with the event.
      trace_data: [
        {
          traceType: 'exception', // [exception]
          type: 'value_error', // The type of exception
          value: 'my value' // The value of the exception (a string).
          //- stacktrace: TBD
        }
      ]
    };
  
    let url = urlBase + '/client-event/' + clientd + '/activity/' + activityType;
    axios.post(url, exceptionEvent).then(resp => {
      expect(resp.status).to.equal(200);
      expect(resp.data).to.have.property('activityProcessed');
      done();
    });
    

  });
});