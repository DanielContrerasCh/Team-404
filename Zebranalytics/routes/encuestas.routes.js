const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const encuestasController = require('../controllers/encuestas.controller')


// Ruta Genérica para Marcas 
router.get('/:marca', isAuth, canUpdate, encuestasController.get_marca);

//Ruta para añadir categorias
router.post('/:marca/agregar_categoria', isAuth, canUpdate, encuestasController.post_nueva_categoria);

// Ruta para editar categorías
router.post('/:marca/editar_categoria', isAuth, canUpdate, encuestasController.post_editar_categoria);

// Ruta para eliminar categorías
router.post('/:marca/eliminar_categoria', isAuth, canUpdate, encuestasController.post_eliminar_categoria);

// //Ruta para editar encuesta
// router.get('/:marca/new/:categoria', isAuth, canUpdate, encuestasController.get_nueva_encuesta);
// router.post('/:marca/new/:categoria', isAuth, canUpdate, encuestasController.post_nueva_encuesta);

// // Ruta para eliminar encuesta
// router.post('/delete_encuesta/:marca/:categoria', isAuth, canUpdate, encuestasController.post_delete_encuesta);

// // Ruta para editar pregunta
// router.post('/editar_pregunta', isAuth, canUpdate, encuestasController.post_editar_pregunta);




module.exports = router;