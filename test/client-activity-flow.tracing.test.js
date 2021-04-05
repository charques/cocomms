const assert = require("chai").assert;
const axios = require('axios');
const chai = require("chai");
const uuid = require('uuid');
const clientEventLib = require('../src/fe-clients/client-event-lib');
const opentracing = require('opentracing');
const MockTracer = opentracing.MockTracer;
var expect = chai.expect;

describe("client activity TRACING tests", () => {

  before(function() {
    const xclientEventApi = require("../src/x-client-event-api");
  });

  it("tracing - custom trace formats", () => {

    return new Promise( async (resolve) => {

      const traceDataArray = [
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

      clientEventLib.init(clientEventAPIBaseUrl, clientId);
      const logger = clientEventLib.getLogger('my-simple-logger', loggerDefaultParams);

      const response = await logger.send('tracing', traceDataArray);

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('activityProcessed');
      resolve();
    });

  });
    
  it("tracing - opentracing standard spans", async () => {

    return new Promise( async (resolve) => {
      
      const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      };

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
      };

      const openTracingSpans = await simulateOpenTracingSpans();
      
      const traceDataArray = [
        {
          type: 'opentracing', // Required. [exception, message, performance]
          spans: openTracingSpans, // Required. The type of exception
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
      clientEventLib.init(clientEventAPIBaseUrl, clientId);
      const logger = clientEventLib.getLogger('my-logger', loggerDefaultParams);
      
      const response = await logger.send('tracing', traceDataArray);
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('activityProcessed');
      resolve();
    });
  });

  it("tracing - zipkin traces", (done) => {
    // https://github.com/openzipkin/zipkin-js-example/tree/master/web

    const fetch = require('node-fetch');
    const clientEventZipkinRecorder = require('../src/fe-clients/ot-tracer/client-event-zipkin-recorder');
    const {Tracer, ExplicitContext} = require('zipkin');

    const ctxImpl = new ExplicitContext();

    const clientEventAPIBaseUrl = 'http://localhost:3003';
    const clientId = '0001-0001';
    const loggerId = 'browser-logger';
    const loggerDefaultParams = {
      level: 'info',
      platform: 'web',
      domainName: 'foo.example.com',
      release: 'my-project-name@1.0.0',
      dist: '14G60',
      tags: { 'web_version': '4.0', 'context': 'production' },
      metadata: { 'other': 'metadata'}
    };

    const recorder = clientEventZipkinRecorder.getRecorder(clientEventAPIBaseUrl, clientId, loggerId, loggerDefaultParams);
    const tracer = new Tracer({ctxImpl, recorder, loggerId});

    // instrument fetch
    const wrapFetch = require('zipkin-instrumentation-fetch');
    const zipkinFetch = wrapFetch(fetch, {tracer});

    const log = text => console.log(text);

    // wrap fetch call so that it is traced. It fails... no service running.
    zipkinFetch('http://localhost:8081/')
      .then(response => (response.text()))
      .then(text => log(text))
      .catch(err =>  {
        log(`Failed: ${err.stack}`);
        done();
      });
  });

});