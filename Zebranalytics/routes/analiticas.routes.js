const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const analiticasController = require('../controllers/analiticas.controller')

router.get('/', isAuth, canSee, analiticasController.get_analiticas);
router.post('/', isAuth, canSee, analiticasController.post_analiticas);

module.exports = router;