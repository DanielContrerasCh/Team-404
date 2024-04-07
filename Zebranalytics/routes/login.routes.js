const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/login.controller')

router.get('/', usuariosController.get_login);
router.post('/', usuariosController.post_login);
router.get('/logout', usuariosController.get_logout);



module.exports = router;