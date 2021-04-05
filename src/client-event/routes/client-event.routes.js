const router = require('express').Router();
const clientEventService = require('../services/client-event.service');

router.post('/client-event/:clientId/activity/:activityType', async function(req, res, next){
  let clientId = req.params.clientId;
  let activityType = req.params.activityType;
  let activityEvent = req.body;
  console.log('1 - /client-event/' + clientId + '/activity/' + activityType + ' - ' + JSON.stringify(activityEvent));

  // TODO validate clientId, eventType, activityEvent
  try {
    let processResult = await clientEventService.logActivity(clientId, activityType, activityEvent);
    return res.json({activityProcessed: processResult});
  }
  catch (e) {
    res.status(418);
    return res.json({message: e.message});
  }
});

module.exports = router;