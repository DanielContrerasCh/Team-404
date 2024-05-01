const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const reviewsController = require('../controllers/reviews.controller');


router.get('/', isAuth, canSee, reviewsController.getReviews);
router.post('/filteredReviews', isAuth, canSee, reviewsController.getSomeReviews);
router.get('/filteredReviews', isAuth, canSee, reviewsController.getReviews);
router.put('/:IdResena/change-visibility', isAuth, canSee, reviewsController.changeVisibility);

module.exports = router;