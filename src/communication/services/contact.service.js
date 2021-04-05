const axios = require('axios');

exports.getContactsByProfile = async function(profileId, type) {
    try {
        const resp = await axios.get('http://localhost:3001/contact?profileId=' + profileId + '&type=' + type);
        return resp.data;
    } catch (err) {
        console.error(err);
        return [];
    }
};
