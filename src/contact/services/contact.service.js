let contacts = {
    '0000-0001': [
        {
            id: '1234-0000',
            type: 'push',
            address: 'push-token-00000000'
        },
        {
            id: '1234-0001',
            type: 'push',
            address: 'push-token-00000001'
        },
        {
            id: '1234-0003',
            type: 'email',
            address: 'foo@foo.com'
        },
        {
            id: '1234-0004',
            type: 'sms',
            address: '+315555555'
        }
    ]
}

function isType(type) {
    return (value) => {
        return value.type == type;
    }
}

exports.getContactsByProfile = async function (profileId, type) {
    if (contacts[profileId] == null) return [];
    let filterFunc = isType(type);
    let contactsByProfile = contacts[profileId];
    return contactsByProfile.filter(filterFunc);
}