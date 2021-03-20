var emailSink = require('../sinks/email.sink')
var smsSink = require('../sinks/sms.sink')
var pushSink = require('../sinks/push.sink')
var inboundSink = require('../sinks/inbound.sink')

let sinks = {
    'email': emailSink.send,
    'sms': smsSink.send,
    'push': pushSink.send,
    'inbound': inboundSink.send
};

exports.split = async function (communication) {
    try {
        console.log("Communication to split " + JSON.stringify(communication));
        var result = await sinks[communication.type](communication)
        return result;
    } catch (e) {
        throw Error('Error broker ' + JSON.stringify(e))
    }
}