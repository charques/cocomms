const uuid = require('uuid');
var brokerSink = require('../sinks/broker.sink');
var channelsConfig = require('../../config/distribution.channels.config');
var contactService = require('./contact.service');
var templateService = require('./template.service');

exports.sendCommunication = async function (commRequest) {
    try {
        //commTarget, commDistribution, commMessage
        let commTarget = commRequest.commTarget;
        let commDistribution = commRequest.commDistribution;
        let commMessage = commRequest.commMessage;
        let channelConfig = channelsConfig.configByChannelId(commDistribution.channelId);
        let contacts = await contactService.getContactsByProfile(commTarget.profileId, channelConfig.type);
        let renderedTemplate = await templateService.renderTemplate(commMessage.templateId, commMessage.templateParams);

        var commIds = [];
        for (const contactItem of contacts) {
            console.log("send communication " + JSON.stringify(commTarget) + " - " + JSON.stringify(commDistribution) + " - " + JSON.stringify(commMessage));
            let commObj = {
                commId: uuid.v4(),
                type: channelConfig.type,
                address: contactItem.address, 
                message: renderedTemplate
            };
            var commId = await brokerSink.send(commObj);
            commIds.push(commId);
        }
        return commIds;
    } catch (e) {
        throw Error('Error communication ' + JSON.stringify(e));
    }
};