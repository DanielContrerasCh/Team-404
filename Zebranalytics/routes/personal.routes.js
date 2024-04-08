const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canAdmin = require('../util/can-admin');
const personalController = require('../controllers/personal.controller')

router.get('/', isAuth, canAdmin, personalController.get_personal);
router.post('/', isAuth, canAdmin, personalController.post_personal);

router.post('/delete', isAuth, canAdmin, personalController.post_delete_personal)
router.post('/modify', isAuth, canAdmin, personalController.post_modify_personal)

router.get('/buscar/:valor_busqueda', isAuth, canAdmin, personalController.get_buscar_personal);
router.get('/buscar', isAuth, canAdmin, personalController.get_buscar_personal);

// router.post('/buscar/:valor_busqueda/delete', isAuth, canAdmin, personalController.post_delete_personal)
// router.post('/buscar/delete', isAuth, canAdmin, personalController.post_delete_personal)

// router.post('/buscar/:valor_busqueda/modify', isAuth, canAdmin, personalController.post_modify_personal)
// router.post('/buscar/modify', isAuth, canAdmin, personalController.post_modify_personal)

module.exports = router;
