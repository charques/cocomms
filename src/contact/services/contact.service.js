const contactsStore = require("../data/contact.store")

function isType(type) {
    return (value) => {
        return value.type == type;
    }
}

exports.getContactsByProfile = async function (profileId, type) {
    let contactsByProfile = contactsStore.getContactsByProfile(profileId);
    let filterFunc = isType(type);
    return contactsByProfile.filter(filterFunc);
}