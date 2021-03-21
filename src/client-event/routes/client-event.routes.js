var router = require('express').Router();
var clientEventService = require('../services/client-event.service')

router.post('/client-event/:appId/activity/:eventType', async function(req, res, next){
  let appId = req.params.appId;
  let eventType = req.params.eventType;
  let activityEvent = req.body;
  console.log('1 - /client-event/' + appId + '/activity/' + eventType + ' - ' + JSON.stringify(activityEvent));

  // TODO validate clientId, eventType, activityEvent

  let processResult = await clientEventService.logActivity(appId, eventType, activityEvent);

  return res.json({processResult: processResult});
});

module.exports = router;