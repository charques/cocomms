var router = require('express').Router();
var communicationService = require('../services/communication.service')

router.post('/communication', async function(req, res, next){
  var body = req.body;
  console.log('/communication ' + JSON.stringify(body));
  let commId = await communicationService.sendCommunication(body.type, body.message);

  return res.json({commId: commId});
});

module.exports = router;