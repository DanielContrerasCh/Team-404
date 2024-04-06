const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const permisosController = require('../controllers/permisos.controller')

router.get('/', isAuth, canUpdate, permisosController.get_permisos);
router.post('/', isAuth, canUpdate, permisosController.post_permisos);

module.exports = router;