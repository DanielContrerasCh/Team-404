const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const canAdmin = require('../util/can-admin');
const canUpdate = require('../util/can-update-reviews');
const reviewsController = require('../controllers/reviews.controller')

router.get('/', isAuth, canAdmin, reviewsController.get_reviews);
router.post('/', isAuth, canAdmin, reviewsController.post_reviews);

module.exports = router;