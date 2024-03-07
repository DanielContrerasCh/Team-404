const express = require('express');
const router = express.Router();
const encuestasController = require('../controllers/encuestas.controller')

router.get('/luuna', encuestasController.get_luuna);
router.get('/luuna/colchones', encuestasController.get_luuna_colchones);
router.post('/luuna', encuestasController.post_luuna);

module.exports = router;