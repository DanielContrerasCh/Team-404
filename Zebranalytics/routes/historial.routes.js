const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const historialController = require('../controllers/historial.controller');

router.get('/', isAuth, historialController.getHistorial);

module.exports = router;