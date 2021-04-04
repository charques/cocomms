
const clientEventLib = require('../client-event-lib');

function logSpan(span) {
  
  const traceDataArray = [
    {
      type: 'zipkin', // Required. [exception, message, performance]
      spans: span, // Required. The type of exception
    }
  ];

  clientEventLib.init('http://localhost:3003', '0001-0001');
  const logger = clientEventLib.getLogger('my-logger');

  const response = logger.send('tracing', traceDataArray);
}

function getLogger(args) {
  return {
    logSpan
  };
}

module.exports.getLogger = getLogger;