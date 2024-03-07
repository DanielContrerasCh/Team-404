const express = require('express');
const router = express.Router();
const encuestasController = require('../controllers/encuestas.controller')

router.get('/luuna', encuestasController.get_luuna);
router.post('/luuna', encuestasController.post_luuna);

module.exports = router;