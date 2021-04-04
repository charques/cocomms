const assert = require("chai").assert;
const axios = require('axios');
const chai = require("chai");
const uuid = require('uuid');
var expect = chai.expect;

describe("client activity flow tests", () => {

  before(function() {
    const xclientEventApi = require("../src/x-client-event-api");
  });

  it("security activity post", (done) => {
    
    const urlBase = 'http://localhost:3003';
    let clientd = '0001-0001';
    let activityType = 'private';

    let headers = {
      origin: "foo.example.com",
      "User-Agent": "User-Agent value",
      "X-AccessToken": "Access Token value"
    };
  
    var securityEvent = {
      eventId: uuid.v4(), // Hexadecimal string representing a uuid4 value.
      timestamp: Date.now(), // Indicates when the event happened.
      platform: 'web', // [web, ios, android] - A string representing the platform
      level: 'info', // [fatal, error, warning, info, debug] - Optional. The record severity.
      logger: 'my.logger.name', // Optional. The name of the logger which created the record.
      domainName: "foo.example.com", // Optional. Identifies the host from which the event was recorded.
      release: "my-project-name@1.0.0", // Optional. The release version of the application.
      dist: "14G60", // Optional. The distribution of the application.
      tags: { "ios_version": "4.0", "context": "production" }, // Optional. A map or list of tags for this event.
      metadata: {}, // Optional. An arbitrary mapping of additional metadata to store with the event.
      securityData: [
        {
          type: 'profileChange', // Required. [profileChange, trusteerReport, tamperingReport]
          fromProfileId: 'xxx1', // Required. Profile id from.
          fromProfileType: 'xxType1', // Optional. Profile type from.
          toProfileId: 'xxx2', // Required. Profile id to.
          toProfileType: 'xxType2', // Optional. Profile type to.
        },
        {
          type: 'trusteerReport' // Required. [profileChange, trusteerReport, tamperingReport]
          // TBD
        },
        {
          type: 'tamperingReport' // Required. [profileChange, trusteerReport, tamperingReport]
          // TBD
        }
      ]
    };
  
    let url = urlBase + '/client-event/' + clientd + '/activity/' + activityType;
    axios.post(url, securityEvent, { headers: headers }).then(resp => {
      expect(resp.status).to.equal(200);
      expect(resp.data).to.have.property('activityProcessed');
      done();
    });
  });

});