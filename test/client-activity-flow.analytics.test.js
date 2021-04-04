const assert = require("chai").assert;
const chai = require("chai");
var expect = chai.expect;

const clientEventLib = require("../src/fe-clients/client-event-lib");

describe("client activity ANALYTICS tests", () => {

  before(function() {
    const xclientEventApi = require("../src/x-client-event-api");
  });

  it("analytics - custom trace formats", () => {

    return new Promise( async (resolve) => {

      const analyticsCommon = {
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

      const traceDataArray = [
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

      const response = await logger.send('analytics', traceDataArray, {}, headers);

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('activityProcessed');
      resolve();
    });

  });

});