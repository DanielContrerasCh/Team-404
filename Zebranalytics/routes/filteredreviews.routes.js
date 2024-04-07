const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const reviewsController = require('../controllers/reviews.controller');

router.put('/:IdResena/change-visibility', isAuth, canSee, reviewsController.change_visibility);

module.exports = router;