const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const encuestasController = require('../controllers/encuestas.controller')

router.get('/luuna', isAuth, canUpdate, encuestasController.get_luuna);

router.get('/new_colchones', isAuth, canUpdate, encuestasController.get_luuna_new_colchones);
router.post('/new_colchones', isAuth, canUpdate, encuestasController.post_luuna_new_colchones);

module.exports = router;