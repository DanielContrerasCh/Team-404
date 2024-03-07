const express = require('express');
const router = express.Router();
const cuentaController = require('../controllers/cuenta.controller')

router.get('/', cuentaController.get_cuenta);
router.post('/', cuentaController.post_cuenta);

module.exports = router;