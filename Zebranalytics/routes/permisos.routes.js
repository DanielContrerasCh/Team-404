const express = require('express');
const router = express.Router();
const permisosController = require('../controllers/permisos.controller')

router.get('/', permisosController.get_permisos);
router.post('/', permisosController.post_permisos);

module.exports = router;