var router = require('express').Router();
var communicationService = require('../services/communication.service')

router.post('/communication', async function(req, res, next){
  var commRequest = req.body;
  console.log('/communication ' + JSON.stringify(commRequest));

  // TODO validate commTarget, commDistribution, commMessage

  let commIds = await communicationService.sendCommunication(commRequest);

  return res.json({commIds: commIds});
});

module.exports = router;