const clientEventConsumptionConfig = require('../config/client-event.consumption.config');

exports.logActivity = async function (clientId, activityType, activityDetails) {

    console.log('2 - /client-event/' + clientId + '/activity/' + activityType + ' - ' + JSON.stringify(activityDetails));

    if (! clientEventConsumptionConfig.isActivityTypeActive(clientId, activityType)) {
        throw new Error('no config');
    }
    
    return true;
};