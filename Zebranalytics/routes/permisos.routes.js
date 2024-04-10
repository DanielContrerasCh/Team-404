const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const canAdmin = require('../util/can-admin');
const permisosController = require('../controllers/permisos.controller')

router.get('/', isAuth, canUpdate, permisosController.get_permisos);
router.post('/', isAuth, canUpdate, permisosController.post_permisos);

router.post('/asignar', isAuth, canAdmin, permisosController.post_asignar_permiso);

router.post('/desasignar', isAuth, canAdmin, permisosController.post_desasignar_permiso);


module.exports = router;