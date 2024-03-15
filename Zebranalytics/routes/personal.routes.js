const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const canAdmin = require('../util/can-admin');
const canUpdate = require('../util/can-update-reviews');
const personalController = require('../controllers/personal.controller')

router.get('/', isAuth, canAdmin, personalController.get_personal);
router.post('/', isAuth, canAdmin, personalController.post_personal);


module.exports = router;
