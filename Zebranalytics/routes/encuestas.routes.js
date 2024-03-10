const express = require('express');
const router = express.Router();
const encuestasController = require('../controllers/encuestas.controller')
  
  
router.get('/luuna', encuestasController.get_luuna);

router.post('/luuna', encuestasController.post_luuna);
// router.get('/luuna', encuestasController.get_luuna);
// router.post('/luuna', encuestasController.post_luuna);

router.get('/mappa', encuestasController.get_mappa);
router.post('/mappa', encuestasController.post_mappa);

router.get('/nooz', encuestasController.get_nooz);
router.post('/nooz', encuestasController.post_nooz);

module.exports = router;