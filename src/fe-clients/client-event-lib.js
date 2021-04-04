const axios = require('axios');
const uuid = require('uuid');

const context = {
    urlBase: null,
    clientId: null
};

/**
 * Initialization method
 * @param {*} args 
 * @param {Logger} args.urlBase url base of the client events api
 * @param {number} args.clienId client application identifier
 */
function init(urlBase, clientId) {
    if (urlBase == null || clientId == null) 
        throw Error('Initialization error');
    context.urlBase = urlBase;
    context.clientId = clientId;
}

/**
 * Instanciates a logger.
 * @param {String} loggerId // Mandatory. The name of the logger which created the record. - Example: 'my.logger.name'
 * @param {Object} loggerParams // Optional fields
 * @param {String} loggerParams.level // Optional. The record severity. Values: [fatal, error, warning, info, debug].
 * @param {String} loggerParams.platform // Optional. A string representing the platform. Values: [web, ios, android]
 * @param {String} loggerParams.domainName // Optional. Identifies the host from which the event was recorded. - Example: "foo.example.com"
 * @param {String} loggerParams.release // Optional. The release version of the application. - Example: "my-project-name@1.0.0"
 * @param {String} loggerParams.dist  // Optional. The distribution of the application. - Example: "14G60"
 * @param {Object} loggerParams.tags // Optional. A map or list of tags for this event. - Example: { "ios_version": "4.0", "context": "production" }
 * @param {Object} loggerParams.metadata Optional. An arbitrary mapping of additional metadata to store with the event.
 * @returns 
 */
function getLogger(loggerId, loggerParams) {

    let logger = loggerId;
    let loggerParamsCleanMain = _optionalFieldsCleanUp(loggerParams); // cleanup params

    /**
     * Sends a trace to Client Events API
     * @param {String} activityType // Mandatory. Client Event API activity. Values: [analytics, tracing, private]
     * @param {Array} traceDataArray // Mandatory. Data to trace.
     * @param {Object} loggerParams // Optional fields. See getLogger function.
     * @param {Object} headers // Optional. HTTP headers
     * @returns 
     */
    async function send(activityType, traceDataArray, loggerParams, headers) {

        var tracingEvent = {
            eventId: uuid.v4(), // Hexadecimal string representing a uuid4 value.
            timestamp: Date.now(), // Indicates when the event happened.
            logger: logger, // The name of the logger which created the record.
            traceData: traceDataArray
        };
        let loggerParamsCleanOverride = _optionalFieldsCleanUp(loggerParams); // cleanup params
        let loggerParamsCombined = {...loggerParamsCleanMain, ...loggerParamsCleanOverride}; // combine main and override params

        tracingEvent = {...tracingEvent, ...loggerParamsCombined}; // combines mandatory and optional fields

        let url = context.urlBase + '/client-event/' + context.clientId + '/activity/' + activityType;
        let response =  await axios.post(url, tracingEvent, { headers: headers });
        return response;
    } 

    /*function _optionalFieldsCleanUp({level, platform, domainName, release, dist, tags, metadata}) { 
         ({level, platform, domainName, release, dist, tags, metadata});
    }*/

    function _optionalFieldsCleanUp(object = {}) {
        var obj = (({ level, platform, domainName, release, dist, tags, metadata }) => ({ level, platform, domainName, release, dist, tags, metadata }))(object);
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
        return obj;
    }

    return {
        send : send
    };
}



module.exports= {
    init: init,
    getLogger: getLogger
};