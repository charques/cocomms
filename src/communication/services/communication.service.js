const uuid = require('uuid');
var brokerSink = require('../sinks/broker.sink')

exports.sendCommunication = async function (type, message) {
    try {
        console.log("send communication " + JSON.stringify(type) + " - " + JSON.stringify(message));
        let commRequest = {
            commId: uuid.v4(),
            type : type,
            message: message
        }
        var commId = await brokerSink.send(commRequest)
        return commId;
    } catch (e) {
        throw Error('Error communication ' + JSON.stringify(e.Error))
    }
}