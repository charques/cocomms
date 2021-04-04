//https://github.com/openzipkin/zipkin-js-example/blob/master/web/recorder.js

const {BatchRecorder} = require('zipkin');
const clientEventZipkinLogger = require("./client-event-zipkin-logger");
  
  function getRecorder(baseUrl, clientId, loggerId, loggerDefaultParams) {

    const logger = clientEventZipkinLogger.getLogger(baseUrl, clientId, loggerId, loggerDefaultParams);

    const batchRecorder = new BatchRecorder({logger});
    return ({
      record: (rec) => {
        const {spanId, traceId} = rec.traceId;
        console.log(`${loggerId} recording: ${traceId}/${spanId} ${rec.annotation.toString()}`);
        batchRecorder.record(rec);
      }
    });
  }
  
  module.exports.getRecorder = getRecorder;