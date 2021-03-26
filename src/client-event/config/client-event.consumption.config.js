let consumptionConfig = {
    '0001-0001': {
        analytics: {
            active: true
        },
        tracing: {
            active: true
        }
    },
    '0001-0002': {
        analytics: {
            active: false
        }
    }
}

 exports.isActivityTypeActive = function (clientId, activityType) {
    return consumptionConfig[clientId] && 
        consumptionConfig[clientId][activityType] && 
        consumptionConfig[clientId][activityType].active;
 }