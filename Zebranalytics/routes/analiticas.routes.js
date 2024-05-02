const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const analiticasController = require('../controllers/analiticas.controller')

router.get('/', isAuth, canSee, analiticasController.getAnaliticas);
router.post('/filteredAnalytics', isAuth, canSee, analiticasController.getSomeAnalytics);
router.get('/filteredAnalytics', isAuth, canSee, analiticasController.getAnaliticas);

module.exports = router;