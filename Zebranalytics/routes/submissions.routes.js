const express = require('express');
const router = express.Router();
const submissionsController = require('../controllers/submissions.controller')

router.post('/submissions', submissionsController.postSubmission);
router.get('/submissions/exitosa', submissionsController.getSuccess);
router.get('/submissions/duplicada', submissionsController.getDuplicate);

module.exports = router;