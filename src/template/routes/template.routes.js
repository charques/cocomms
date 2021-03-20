var router = require('express').Router();
var templateService = require('../services/template.service')

router.post('/render', async function(req, res, next){
  let templateId = req.body.templateId;
  let templateParams = req.body.templateParams;

  console.log('/render ' + templateId + ' '+ JSON.stringify(templateParams));

  // TODO validate templateId, templateParams
  let renderedMessage = await templateService.render(templateId, templateParams);

  return res.json(renderedMessage);
});

module.exports = router;