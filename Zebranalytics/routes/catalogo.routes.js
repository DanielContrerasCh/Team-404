const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canSee = require('../util/can-see');
const catalogoController = require('../controllers/catalogo.controller');

router.get('/', isAuth, canSee, catalogoController.getAllProducts);
router.post('/product', catalogoController.getProductByBrand);
module.exports = router;