const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const brandsController = require('../controllers/brands.controller')

router.get('/', isAuth, canUpdate, brandsController.get_brands);
router.post('/', isAuth, canUpdate, brandsController.post_brands);
router.get('/new', isAuth, canUpdate, brandsController.get_new_brands);
router.post('/new', isAuth, canUpdate, brandsController.post_new_brands);

module.exports = router;