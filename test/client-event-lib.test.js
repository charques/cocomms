const assert = require("chai").assert;
const chai = require("chai");
var expect = chai.expect;

const clientEventLib = require("../src/fe-clients/client-event-lib");

describe("client event client tests", () => {

  before(function() {
    const xclientEventApi = require("../src/x-client-event-api");
  });

  it("basic send test", () => {

    return new Promise( async (resolve) => {

        clientEventLib.init('http://localhost:3003', '0001-0001');
        const logger = clientEventLib.getLogger('my-logger');

        const resp = await logger.send('tracing', [{}]);

        expect(resp.status).to.equal(200);
        expect(resp.data).to.have.property('activityProcessed');
        resolve();
    });

  });

});