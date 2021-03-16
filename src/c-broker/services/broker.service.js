var emailSink = require('../data-sinks/email.sink')
var smsSink = require('../data-sinks/sms.sink')
var pushSink = require('../data-sinks/push.sink')

let sinks = {
    'email': emailSink.send,
    'sms': smsSink.send,
    'push': pushSink.send
};

exports.split = async function (message) {
    try {
        console.log("Message to split " + JSON.stringify(message));
        var result = await sinks[message.type](message)
        return result;
    } catch (e) {
        // Log Errors
        console.log("Error broker " + JSON.stringify(e.Error));
        throw Error('Error broker ' + JSON.stringify(e.Error))
    }
}