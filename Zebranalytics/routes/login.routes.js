const express = require('express');
const router = express.Router();
const passport = require('passport');
const usuariosController = require('../controllers/login.controller');

router.get('/', usuariosController.get_login);
router.post('/', usuariosController.post_login);
router.get('/logout', usuariosController.get_logout);

router.get('/auth/google', usuariosController.login);
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  usuariosController.callback
);

module.exports = router;