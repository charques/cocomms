
const clientEventLib = require('../client-event-lib');

var logger = null;

function logSpan(span) {
  const traceDataArray = [
    {
      type: 'zipkin', // Required. [exception, message, performance]
      spans: span, // Required. The type of exception
    }
  ];

  const response = logger.send('tracing', traceDataArray);
}

function getLogger(baseUrl, clientId, loggerId, loggerDefaultParams) {
  
  clientEventLib.init(baseUrl, clientId);
  logger = clientEventLib.getLogger(loggerId, loggerDefaultParams);

  return {
    logSpan
  };
}

module.exports.getLogger = getLogger;