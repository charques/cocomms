const assert = require("chai").assert;
const axios = require('axios');
const chai = require("chai");
const uuid = require('uuid');
var expect = chai.expect;

describe("client activity flow tests", () => {

  before(function() {
    const xclientEventApi = require("../src/x-client-event-api");
  });

  it("analytics activity post", (done) => {
    
    const urlBase = 'http://localhost:3003';
    let clientd = '0001-0001';
    let activityType = 'analytics';

    let headers = {
      origin: "foo.example.com",
      "User-Agent": "User-Agent value",
      "X-AccessToken": "Access Token value"
    }
  
    let analyticsCommon = {
      screenResolution: "xxx", // Screen resolution 
      browserHeight: 1000, // Browser height
      browserWidth: 200, // Broser weight
      timeZone: 1, // Time zone
      colorDepth: 1, // Color depth
      referrer: "xxx", // Referrer
      cookieEnabled: 1, // Cookie enabled
      javaEnabled: 1, // Java enabled
      timestamp: Date.now(), // Indicates when the event happened.
      pageName: "xxx" // Name of the page
    };

    let analyticsEvent = {
      eventId: uuid.v4(), // Hexadecimal string representing a uuid4 value.
      timestamp: Date.now(), // Indicates when the event happened.
      platform: 'web', // [web, ios, android] - A string representing the platform.
      level: 'info', // [fatal, error, warning, info, debug] - Optional. The record severity.
      logger: 'my.logger.name', // Optional. The name of the logger which created the record.
      domainName: "foo.example.com", // Optional. Identifies the host from which the event was recorded.
      release: "my-project-name@1.0.0", // Optional. The release version of the application.
      dist: "14G60", // Optional. The distribution of the application.
      tags: { "ios_version": "4.0", "context": "production" }, // Optional. A map or list of tags for this event.
      metadata: {}, // Optional. An arbitrary mapping of additional metadata to store with the event.
      analyticsData: [
        {
          type: 'pageload', // Required. [pageload, action, error, search, form, displayInbound, elementsOnPage, custom]
          analyticsCommon: analyticsCommon, // Required. Standard info.
          marketingPref: "xx", // Required
          clientIdentifier: "xx", // Required
          gclid: "xx", // Optional
          offerCode: "xx", // Optional
          propCode: "xx", // Optional
          mc: "xx", // Optional
          campaignId: "xx", // Optional
          experiments: {} // Optional
        },
        {
          type: 'action', // Required. [pageload, action, error, search, form, displayInbound, elementsOnPage, custom]
          analyticsCommon: analyticsCommon, // Required. Standard info.
          value: 'my-message' // Required. The value of the message (a string).
        },
        {
          type: 'error', // Required. [pageload, action, error, search, form, displayInbound, elementsOnPage, custom]
          analyticsCommon: analyticsCommon, // Required. Standard info.
          errorDesc: "Invalid email id.", // Required. Error description.
          errorType: 'ValidationError' // Required. Error type.
        },
        {
          type: 'search', // Required. [pageload, action, error, search, form, displayInbound, elementsOnPage, custom]
          analyticsCommon: analyticsCommon, // Required. Standard info.
          searchAmountOfResults: 11, // Required. Amount of results.
          searchTerm: 'search term' // Required. Search term.
        },
        {
          type: 'form', // Required. [pageload, action, error, search, form, displayInbound, elementsOnPage, custom]
          analyticsCommon: analyticsCommon, // Required. Standard info.
          formId: "form id", // Required. Form identifier.
          formOutcome: "x", // Optional
          formStatus: "x", // Optional
          formStep: "x", // Optional
          transactionId: "x" // Optional
        },
        {
          type: 'displayInbound', // Required. [pageload, action, error, search, form, displayInbound, elementsOnPage, custom]
          analyticsCommon: analyticsCommon, // Required. Standard info.
          inboundPropositionCode: "x", // Required. 
          inboundTrackingCode: "x", // Required. 
          inboundType: "x", // Required. 
          inboundUUID: "x" // Required. 
        },
        {
          type: 'elementsOnPage', // Required. [pageload, action, error, search, form, displayInbound, elementsOnPage, custom]
          analyticsCommon: analyticsCommon, // Required. Standard info.
          elementType: "x", // Required.
          elementContent: "x", // Optional.
          elementAction: "x", // Optional.
          elementPosition: "x", // Optional.
          pageViews: 1 // Optional.
        },
        {
          type: 'custom', // Required. [pageload, action, error, search, form, displayInbound, elementsOnPage, custom]
          analyticsCommon: analyticsCommon, // Required. Standard info.
          eventKey: "x", // Required.
          eventValue: "x", // Required.
        }

      ]
    };
  
    let url = urlBase + '/client-event/' + clientd + '/activity/' + activityType;
    axios.post(url, analyticsEvent, { headers: headers }).then(resp => {
      expect(resp.status).to.equal(200);
      expect(resp.data).to.have.property('activityProcessed');
      done();
    });
  });

});