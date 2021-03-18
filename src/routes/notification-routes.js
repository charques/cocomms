var router = require('express').Router();
var notificationService = require('../c-broker/services/notification.service')

router.post('/notification', async function(req, res, next){
  var body = req.body;
  console.log('/notification ' + JSON.stringify(body));
  let commId = await notificationService.sendNotification(body.type, body.message);

  return res.json({commId: commId});
});

module.exports = router;