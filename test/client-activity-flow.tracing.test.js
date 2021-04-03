const assert = require("chai").assert;
const axios = require('axios');
const chai = require("chai");
const uuid = require('uuid');
const opentracing = require('opentracing');
const MockTracer = opentracing.MockTracer;
var expect = chai.expect;

describe("client activity flow tests", () => {

  before(function() {
    const xclientEventApi = require("../src/x-client-event-api");
  });

  it("tracing activity post", (done) => {
    
    const urlBase = 'http://localhost:3003';
    let clientd = '0001-0001';
    let activityType = 'tracing';

    let headers = {
      origin: "foo.example.com",
      "User-Agent": "User-Agent value",
      "X-AccessToken": "Access Token value"
    }
  
    var tracingEvent = {
      eventId: uuid.v4(), // Hexadecimal string representing a uuid4 value.
      timestamp: Date.now(), // Indicates when the event happened.
      platform: 'web', // [web, ios, android] - A string representing the platform
      level: 'error', // [fatal, error, warning, info, debug] - Optional. The record severity.
      logger: 'my.logger.name', // Optional. The name of the logger which created the record.
      domainName: "foo.example.com", // Optional. Identifies the host from which the event was recorded.
      release: "my-project-name@1.0.0", // Optional. The release version of the application.
      dist: "14G60", // Optional. The distribution of the application.
      tags: { "ios_version": "4.0", "context": "production" }, // Optional. A map or list of tags for this event.
      metadata: {}, // Optional. An arbitrary mapping of additional metadata to store with the event.
      traceData: [
        {
          type: 'exception', // Required. [exception, message, performance]
          exceptionType: 'value_error', // Required. The type of exception
          exceptionValue: 'my value', // Required. The value of the exception (a string).
          transaction: '/users/<username>/' // Optional. The name of the transaction which caused the exception.
          //- stacktrace: TBD
        },
        {
          type: 'message', // Required. [exception, message, performance]
          value: 'my-message' // Required. The value of the message (a string).
        },
        {
          type: 'performance', // Required. [exception, message, performance]
          value: 1.2 // Required. The value of the performance test.
        }
      ]
    };
  
    let url = urlBase + '/client-event/' + clientd + '/activity/' + activityType;
    axios.post(url, tracingEvent, { headers: headers }).then(resp => {
      expect(resp.status).to.equal(200);
      expect(resp.data).to.have.property('activityProcessed');
      done();
    });
  });

  it("tracing activity post 2", async () => {

    return new Promise( async (resolve) => {
      
      const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      const simulateOpenTracingSpans = async () => {
        const tracer = new MockTracer();
        const parent = tracer.startSpan('parent_span');
        parent.setTag('custom', 'tag value');
        parent.setTag('alpha', '1000');
        await sleep(1000);
        const child = tracer.startSpan('child_span', { childOf: parent });
        child.setTag('alpha', '200');
        child.setTag('beta', '50');
        child.log({state: 'waiting'});
        await sleep(500);
        child.log({state: 'done'});
        child.finish();
        parent.finish();

        const report = tracer.report();

        function getSpans(report) {
          // https://opentracing.io/docs/overview/spans/
          var resultObject = [];
          for (const span of report.spans) {
            var spanObject = {
              uuid: span.uuid(),
              operationName: span.operationName(),
              startMs: span._startMs,
              finishMs: span._finishMs,
              tags: span._tags,
              logs: span._logs
            };
            resultObject.push(spanObject);
          }
          return resultObject;
        }

        return getSpans(report);
      }

      const openTracingSpans = await simulateOpenTracingSpans();
      console.log(JSON.stringify(openTracingSpans));

      const urlBase = 'http://localhost:3003';
      let clientd = '0001-0001';
      let activityType = 'tracing';

      let headers = {
        origin: "foo.example.com",
        "User-Agent": "User-Agent value",
        "X-AccessToken": "Access Token value"
      }
    
      var tracingEvent = {
        eventId: uuid.v4(), // Hexadecimal string representing a uuid4 value.
        timestamp: Date.now(), // Indicates when the event happened.
        platform: 'web', // [web, ios, android] - A string representing the platform
        level: 'error', // [fatal, error, warning, info, debug] - Optional. The record severity.
        logger: 'my.logger.name', // Optional. The name of the logger which created the record.
        domainName: "foo.example.com", // Optional. Identifies the host from which the event was recorded.
        release: "my-project-name@1.0.0", // Optional. The release version of the application.
        dist: "14G60", // Optional. The distribution of the application.
        tags: { "ios_version": "4.0", "context": "production" }, // Optional. A map or list of tags for this event.
        metadata: {}, // Optional. An arbitrary mapping of additional metadata to store with the event.
        traceData: [
          {
            type: 'opentracing', // Required. [exception, message, performance]
            spans: openTracingSpans, // Required. The type of exception
          }
        ]
      };
    
      let url = urlBase + '/client-event/' + clientd + '/activity/' + activityType;
      axios.post(url, tracingEvent, { headers: headers })
      .then(resp => {
        expect(resp.status).to.equal(200);
        expect(resp.data).to.have.property('activityProcessed');
        //done();
        resolve();
      })

    });

  });

});