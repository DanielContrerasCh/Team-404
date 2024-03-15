const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const canAdmin = require('../util/can-admin');
const canUpdate = require('../util/can-update-reviews');
const usuariosController = require('../controllers/login.controller')

router.get('/login', usuariosController.get_login);
router.post('/login', usuariosController.post_login);
router.get('/logout', usuariosController.get_logout);
router.get('/signup', isAuth, canAdmin, usuariosController.get_signup);
router.get('/signup', isAuth, canAdmin, usuariosController.post_signup);


module.exports = router;