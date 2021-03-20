let templates = {
    'my-template': 'My dummy template: #greeting1# #greeting2#!'
}

exports.getTemplate = function(templateId) {
    return templates[templateId];
}