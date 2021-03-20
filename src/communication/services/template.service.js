const axios = require('axios');

exports.renderTemplate = async function(templateId, templateParams) {
    try {
        let data = {
            templateId,
            templateParams
        }
        const resp = await axios.post('http://localhost:3002/render', data);
        return resp.data;
    } catch (err) {
        console.error(err);
        return [];
    }
}
