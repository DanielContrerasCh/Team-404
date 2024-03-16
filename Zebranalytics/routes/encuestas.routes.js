const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const encuestasController = require('../controllers/encuestas.controller')
  
  
router.get('/luuna', isAuth, encuestasController.get_luuna);

router.post('/luuna', isAuth, encuestasController.post_luuna_save);

router.post('/luuna_modify', isAuth, encuestasController.post_luuna_modify);
// router.post('/luuna/boton', encuestasController.post_luuna_boton);
// router.get('/luuna', encuestasController.get_luuna);
// router.post('/luuna', encuestasController.post_luuna);

router.get('/mappa', isAuth, encuestasController.get_mappa);
router.post('/mappa', isAuth, encuestasController.post_mappa);

router.get('/nooz', isAuth, encuestasController.get_nooz);
router.post('/nooz', isAuth, encuestasController.post_nooz);

module.exports = router;