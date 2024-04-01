const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const reviewsController = require('../controllers/reviews.controller')



router.get('/', isAuth, canSee, reviewsController.get_reviews);
router.post('/', isAuth, canSee, reviewsController.post_reviews);
router.put('/:IdResena/change-visibility', isAuth, canSee, reviewsController.change_visibility);

module.exports = router;