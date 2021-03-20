const templateStore = require("../data/template.store");

exports.render = async function (templateId, templateParams) {
    let template = templateStore.getTemplate(templateId);

    for (const [key, value] of Object.entries(templateParams)) {
        template = template.replace('#'+key+'#', value);
    }

    return template;
}