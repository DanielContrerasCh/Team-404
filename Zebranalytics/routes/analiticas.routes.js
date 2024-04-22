const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const analiticasController = require('../controllers/analiticas.controller')

router.get('/', isAuth, canSee, analiticasController.getAnaliticas);
router.post('/filteredAnalyticsBybrandAndYear', isAuth, canSee, analiticasController.getSomeAnalyticsbyBrandAndYear);
router.post('/filteredAnalyticsByitemCodeAndYear', isAuth, canSee, analiticasController.getSomeAnalyticsbyItemCodeAndYear);
module.exports = router;