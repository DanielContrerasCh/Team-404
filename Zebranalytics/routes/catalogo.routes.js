const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const catalogoController = require('../controllers/catalogo.controller');

router.get('/', isAuth, canSee, catalogoController.getAllProducts);
router.get('/buscar/:valorBusqueda', isAuth, canSee, catalogoController.getBuscar);
router.get('/buscar', isAuth, canSee
, catalogoController.getBuscar);
router.post('/brand', catalogoController.getProductByBrand);
module.exports = router;