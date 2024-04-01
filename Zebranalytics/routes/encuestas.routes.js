const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const encuestasController = require('../controllers/encuestas.controller')

router.get('/luuna', isAuth, canUpdate, encuestasController.get_luuna);
router.get('/mappa', isAuth, canUpdate, encuestasController.get_mappa);
router.get('/nooz', isAuth, canUpdate, encuestasController.get_nooz);

router.get('/luuna_new_colchones', isAuth, canUpdate, encuestasController.get_luuna_new_colchones);
router.post('/luuna_new_colchones', isAuth, canUpdate, encuestasController.post_luuna_new_colchones);

router.get('/luuna_new_almohadas', isAuth, canUpdate, encuestasController.get_luuna_new_almohadas);
router.post('/luuna_new_almohadas', isAuth, canUpdate, encuestasController.post_luuna_new_almohadas);

router.get('/luuna_new_muebles', isAuth, canUpdate, encuestasController.get_luuna_new_muebles);
router.post('/luuna_new_muebles', isAuth, canUpdate, encuestasController.post_luuna_new_muebles);

router.get('/luuna_new_blancos', isAuth, canUpdate, encuestasController.get_luuna_new_blancos);
router.post('/luuna_new_blancos', isAuth, canUpdate, encuestasController.post_luuna_new_blancos);

router.get('/luuna_new_ninos', isAuth, canUpdate, encuestasController.get_luuna_new_ninos);
router.post('/luuna_new_ninos', isAuth, canUpdate, encuestasController.post_luuna_new_ninos);

module.exports = router;