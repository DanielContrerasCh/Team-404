const express = require('express');
const router = express.Router();
const personalController = require('../controllers/personal.controller')

router.get('/', personalController.get_personal);
router.post('/', personalController.post_personal);

module.exports = router;