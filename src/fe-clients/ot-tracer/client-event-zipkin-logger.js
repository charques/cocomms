const axios = require('axios');
const uuid = require('uuid');

const urlBase = 'http://localhost:3003';
let clientd = '0001-0001';
let activityType = 'tracing';

let headers = {
  origin: "foo.example.com",
  "User-Agent": "User-Agent value",
  "X-AccessToken": "Access Token value"
}

let url = urlBase + '/client-event/' + clientd + '/activity/' + activityType;

function logSpan(span) {
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
        spans: span, // Required. The type of exception
      }
    ]
  };

  axios.post(url, tracingEvent, { headers: headers })
  .then(resp => {
    //console.log(resp);
  })
}

function getLogger(args) {
  return {
    logSpan
  }
}

module.exports.getLogger = getLogger;