const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canAdmin = require('../util/can-admin');
const canUpdate = require('../util/can-update-reviews');

const brandsController = require('../controllers/brands.controller')

router.get('/', isAuth, canUpdate, brandsController.getBrands);

router.get('/new', isAuth, canAdmin, brandsController.getNewBrands);
router.post('/new', isAuth, canAdmin, brandsController.postNewBrands);


router.get('/delete', isAuth, canAdmin, brandsController.getDeleteBrands);
router.post('/delete', isAuth, canAdmin, brandsController.postDeleteBrands);


router.get('/editName', isAuth, canAdmin, brandsController.getEditBrandsName);
router.post('/editName', isAuth, canAdmin, brandsController.postEditBrandsName);

router.get('/editImage', isAuth, canAdmin, brandsController.getEditBrandsImage);
router.post('/editImage', isAuth, canAdmin, brandsController.postEditBrandsImage);

module.exports = router;