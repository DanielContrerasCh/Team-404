const express = require('express');
const router = express.Router();
const brandsController = require('../controllers/brands.controller')

router.get('/', brandsController.get_brands);
router.post('/', brandsController.post_brands);
router.get('/new', brandsController.get_new_brands);
router.post('/new', brandsController.post_new_brands);

module.exports = router;