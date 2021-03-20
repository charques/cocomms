let channelConfig = {
    'my-push-channel': {
        type: 'push'
    },
    'my-email-channel': {
        type: 'email'
    },
    'my-sms-channel': {
        type: 'sms'
    },
    'my-inbound-channel': {
        type: 'inbound'
    }
}

 exports.configByChannelId = function (channelId) {
    return channelConfig[channelId];
 }