var brokerSink = require('../sinks/broker.sink');

exports.split = async function (communication) {
    try {
        console.log("Communication to split " + JSON.stringify(communication));
        var result = await brokerSink.send(communication.type, communication);
        return result;
    } catch (e) {
        throw Error('Error broker ' + JSON.stringify(e));
    }
};