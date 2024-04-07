const express = require('express');
const router = express.Router();
const landingPageController = require('../controllers/landingPage.controller')

router.get('/', landingPageController.get_landingPage);

module.exports = router;