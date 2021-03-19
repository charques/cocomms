const uuid = require('uuid');
var brokerSink = require('../sinks/broker.sink');
var channelsConfig = require('../../config/distribution.channels.config');
var contactService = require('./contact.service');

exports.sendCommunication = async function (commTarget, commDistribution, commMessage) {
    try {
        let channelConfig = channelsConfig.configByChannelId(commDistribution.channelId);
        let contacts = await contactService.getContactsByProfile(commTarget.profileId, channelConfig.type);

        var commIds = [];
        for (const contactItem of contacts) {
            console.log("send communication " + JSON.stringify(commTarget) + " - " + JSON.stringify(commDistribution) + " - " + JSON.stringify(commMessage));
            let commRequest = {
                commId: uuid.v4(),
                type : channelConfig.type,
                address: contactItem.address, 
                message: commMessage.message
            }
            var commId = await brokerSink.send(commRequest);
            commIds.push(commId);
        };

        return commIds;
    } catch (e) {
        throw Error('Error communication ' + JSON.stringify(e.Error))
    }
}