const express = require('express');
const router = express.Router();
const submissionsController = require('../controllers/submissions.controller')

router.post('/submissions', submissionsController.postSubmission);

module.exports = router;