const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const analiticasController = require('../controllers/analiticas.controller')

router.get('/', isAuth, canSee, analiticasController.getAnaliticas);
router.post('/', isAuth, canSee, analiticasController.post_analiticas);
router.post('/filteredAnalyticsBybrandAndYear', isAuth, canSee, analiticasController.getSomeAnalyticsbyBrandAndYear);
router.post('/filteredAnalyticsByitemCode', isAuth, canSee, analiticasController.getSomeAnalyticsbyItemCode);
module.exports = router;