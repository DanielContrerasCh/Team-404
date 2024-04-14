const express = require('express');
const router = express.Router();
const zecoreController = require('../controllers/zecore.controller')

router.post('/procesarVenta', zecoreController.postVenta);
router.post('/procesarProducto', zecoreController.postProducto);

module.exports = router;