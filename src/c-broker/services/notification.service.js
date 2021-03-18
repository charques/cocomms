var brokerSink = require('../data-sinks/broker.sink')

exports.sendNotification = async function (type, message) {
    try {
        console.log("send notification " + JSON.stringify(type) + " - " + JSON.stringify(message));
        var commId = await brokerSink.send(type, message)
        return commId;
    } catch (e) {
        // Log Errors
        console.log("Error notification " + JSON.stringify(e.Error));
        throw Error('Error notification ' + JSON.stringify(e.Error))
    }
}