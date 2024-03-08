const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/analiticas.controller')

router.get('/', brandsController.get_brands);
router.post('/', brandsController.post_brands);

module.exports = router;