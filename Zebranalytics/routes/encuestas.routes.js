const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const encuestasController = require('../controllers/encuestas.controller')

// Vistas de marcas
router.get('/luuna', isAuth, canUpdate, encuestasController.get_luuna);
router.get('/mappa', isAuth, canUpdate, encuestasController.get_mappa);
router.get('/nooz', isAuth, canUpdate, encuestasController.get_nooz);

// Rutas para Luuna
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

//Rutas para Mappa
router.get('/mappa_new_maletas', isAuth, canUpdate, encuestasController.get_mappa_new_maletas);
router.post('/mappa_new_maletas', isAuth, canUpdate, encuestasController.post_mappa_new_maletas);

router.get('/mappa_new_mochilas', isAuth, canUpdate, encuestasController.get_mappa_new_mochilas);
router.post('/mappa_new_mochilas', isAuth, canUpdate, encuestasController.post_mappa_new_mochilas);

router.get('/mappa_new_accesorios', isAuth, canUpdate, encuestasController.get_mappa_new_accesorios);
router.post('/mappa_new_accesorios', isAuth, canUpdate, encuestasController.post_mappa_new_accesorios);

//Rutas para Nooz
router.get('/nooz_new_colchones', isAuth, canUpdate, encuestasController.get_nooz_new_colchones);
router.post('/nooz_new_colchones', isAuth, canUpdate, encuestasController.post_nooz_new_colchones);

router.get('/nooz_new_almohadas', isAuth, canUpdate, encuestasController.get_nooz_new_almohadas);
router.post('/nooz_new_almohadas', isAuth, canUpdate, encuestasController.post_nooz_new_almohadas);

router.get('/nooz_new_camas', isAuth, canUpdate, encuestasController.get_nooz_new_camas);
router.post('/nooz_new_camas', isAuth, canUpdate, encuestasController.post_nooz_new_camas);

router.get('/nooz_new_blancos', isAuth, canUpdate, encuestasController.get_nooz_new_blancos);
router.post('/nooz_new_blancos', isAuth, canUpdate, encuestasController.post_nooz_new_blancos);

router.get('/nooz_new_accesorios', isAuth, canUpdate, encuestasController.get_nooz_new_accesorios);
router.post('/nooz_new_accesorios', isAuth, canUpdate, encuestasController.post_nooz_new_accesorios);

//Ruta para eliminar encuesta
router.post('/delete_encuesta/:marca/:categoria', isAuth, canUpdate, encuestasController.post_delete_encuesta);

//Ruta para editar pregunta
router.post('/editar_pregunta', isAuth, canUpdate, encuestasController.post_editar_pregunta);

//Ruta para editar opciones de pregunta
router.post('/editar_pregunta_opcion', isAuth, canUpdate, encuestasController.post_editar_pregunta_opcion);

module.exports = router;