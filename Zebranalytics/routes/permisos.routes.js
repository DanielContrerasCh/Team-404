const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const canAdmin = require('../util/can-admin');
const permisosController = require('../controllers/permisos.controller')

router.get('/', isAuth, canUpdate, permisosController.get_permisos);

router.post('/asignar', isAuth, canAdmin, permisosController.post_asignar_permiso);
router.post('/desasignar', isAuth, canAdmin, permisosController.post_desasignar_permiso);

router.get('/new', isAuth, canAdmin, permisosController.getNewRol);
router.post('/new', isAuth, canAdmin, permisosController.postNewRol);
router.post('/delete', isAuth, canAdmin, permisosController.postDeleteRol);
router.post('/renombrar', isAuth, canAdmin, permisosController.postRenombrarRol);
module.exports = router;