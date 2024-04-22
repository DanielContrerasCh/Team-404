const express = require('express');
const router = express.Router();
const isAuth = require('../util/isAuth');
const ayudaController = require('../controllers/ayuda.controller');

router.get('/', isAuth, ayudaController.getAyuda);
router.get('/cuenta', isAuth, ayudaController.getAyudaCuenta);
router.get('/catalogo', isAuth, ayudaController.getAyudaCatalogo);
router.get('/resenas', isAuth, ayudaController.getAyudaResenas);
router.get('/analiticas', isAuth, ayudaController.getAyudaAnaliticas);
router.get('/marcas', isAuth, ayudaController.getAyudaMarcas);
router.get('/encuestas', isAuth, ayudaController.getAyudaEncuestas);
router.get('/personal', isAuth, ayudaController.getAyudaPersonal);
router.get('/roles', isAuth, ayudaController.getAyudaRoles);

module.exports = router;
