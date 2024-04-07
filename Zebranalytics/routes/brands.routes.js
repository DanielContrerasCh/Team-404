const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canAdmin = require('../util/can-admin');
const canUpdate = require('../util/can-update-reviews');

const brandsController = require('../controllers/brands.controller')

router.get('/', isAuth, canUpdate, brandsController.get_brands);
router.post('/', isAuth, canUpdate, brandsController.post_brands);


router.get('/new', isAuth, canAdmin, brandsController.get_new_brands);
router.post('/new', isAuth, canAdmin, brandsController.post_new_brands);


router.get('/delete', isAuth, canAdmin, brandsController.get_delete_brands);
router.post('/delete', isAuth, canAdmin, brandsController.post_delete_brands);


router.get('/editname', isAuth, canAdmin, brandsController.get_edit_brands_name);
router.post('/editname', isAuth, canAdmin, brandsController.post_edit_brands_name);

router.get('/editimage', isAuth, canAdmin, brandsController.get_edit_brands_image);
router.post('/editimage', isAuth, canAdmin, brandsController.post_edit_brands_image);

module.exports = router;