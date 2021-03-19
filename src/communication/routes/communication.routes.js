var router = require('express').Router();
var communicationService = require('../services/communication.service')

router.post('/communication', async function(req, res, next){
  var body = req.body;
  console.log('/communication ' + JSON.stringify(body));

  // TODO validate commTarget, commDistribution, commMessage

  let commIds = await communicationService.sendCommunication(body.commTarget, body.commDistribution, body.commMessage);

  return res.json({commIds: commIds});
});

module.exports = router;