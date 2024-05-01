const express = require('express');
const router = express.Router();
const zecoreController = require('../controllers/zecore.controller')

router.post('/procesarVenta', zecoreController.postVenta);
router.post('/procesarProducto', zecoreController.postProducto);
router.post('/eliminarProducto', zecoreController.deleteProducto);
router.post('/modificarProducto', zecoreController.modifyProducto);
router.get('/getReviews', zecoreController.getReviews);

module.exports = router;