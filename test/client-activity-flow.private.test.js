const assert = require("chai").assert;
const chai = require("chai");
var expect = chai.expect;

const clientEventLib = require("../src/fe-clients/client-event-lib");

describe("client activity PRIVATE tests", () => {

  before(function() {
    const xclientEventApi = require("../src/x-client-event-api");
  });

  it("private - custom trace formats", () => {

    return new Promise( async (resolve) => {

      const traceDataArray = [
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
      ];

      const clientEventAPIBaseUrl = 'http://localhost:3003';
      const clientId = '0001-0001';
      const loggerDefaultParams = {
        level: 'info',
        platform: 'web',
        domainName: 'foo.example.com',
        release: 'my-project-name@1.0.0',
        dist: '14G60',
        tags: { 'web_version': '4.0', 'context': 'production' },
        metadata: { 'other': 'metadata'}
      };
      const headers = {
        origin: "foo.example.com",
        "User-Agent": "User-Agent value",
        "X-AccessToken": "Access Token value"
      };

      clientEventLib.init(clientEventAPIBaseUrl, clientId);
      const logger = clientEventLib.getLogger('my-simple-logger', loggerDefaultParams);

      const response = await logger.send('private', traceDataArray, {}, headers);

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('activityProcessed');
      resolve();
    });

  });

});