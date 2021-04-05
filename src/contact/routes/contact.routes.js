var router = require('express').Router();
var contactService = require('../services/contact.service');

router.get('/contact', async function(req, res, next){
  let profileId = req.query.profileId;
  let type = req.query.type;

  console.log('/contact ' + profileId + ' '+ type);

  // TODO validate profile, type
  let contacts = await contactService.getContactsByProfile(profileId, type);

  return res.json(contacts);
});

module.exports = router;