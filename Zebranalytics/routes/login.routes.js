const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller')

router.get('/login', loginController.get_login);
router.post('/login', loginController.post_login);
router.get('/logout', loginController.get_logout);

module.exports = router;