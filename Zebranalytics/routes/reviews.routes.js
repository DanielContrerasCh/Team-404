const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller')

router.get('/', reviewsController.get_reviews);
router.post('/', reviewsController.post_reviews);

module.exports = router;