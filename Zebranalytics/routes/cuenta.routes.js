const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const cuentaController = require('../controllers/cuenta.controller')

router.get('/', isAuth, cuentaController.get_cuenta);
router.post('/', isAuth, cuentaController.post_cuenta);
router.post('/edit', isAuth, cuentaController.post_cuenta_editar);

module.exports = router;