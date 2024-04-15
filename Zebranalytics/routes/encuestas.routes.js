const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const encuestasController = require('../controllers/encuestas.controller')
const categoriasController = require('../controllers/categorias.controller')

// Ruta genérica para Marcas 
router.get('/:marca', isAuth, canUpdate, encuestasController.get_marca);

//Ruta para añadir categorias
router.post('/:marca/agregar_categoria', isAuth, canUpdate, categoriasController.post_nueva_categoria);

// Ruta para editar categorías
router.post('/:marca/editar_categoria', isAuth, canUpdate, categoriasController.post_editar_categoria);

// Ruta para eliminar categorías
router.post('/:marca/eliminar_categoria', isAuth, canUpdate, categoriasController.post_eliminar_categoria);

// Ruta génerica para encuestas de una categoría
router.get('/:marca/:categoria', isAuth, canUpdate, encuestasController.get_nueva_encuesta);

// Ruta para agregar pregunta
router.post('/:marca/:categoria', isAuth, canUpdate, encuestasController.post_nueva_encuesta);

// Ruta para eliminar encuesta
router.post('/delete_encuesta/:marca/:categoria', isAuth, canUpdate, encuestasController.post_delete_encuesta);

//Ruta para editar pregunta
router.post('/editar_pregunta/:marca/:categoria', isAuth, canUpdate, encuestasController.post_editar_pregunta);

// Ruta para eliminar 1 sola pregunta
router.post('/delete_pregunta/:marca/:categoria', isAuth, canUpdate, encuestasController.post_delete_pregunta);

// Ruta para editar opciones de una categoria
router.post('/editar_opciones_pregunta/:marca/:categoria', isAuth, canUpdate, encuestasController.post_editar_opciones_pregunta);

// Ruta para previsualizar la encuesta
router.get('/previsualizar/:marca/:categoria', isAuth, canUpdate, encuestasController.get_previsualizar_encuesta)

// Ruta para modificar tiempo de encuesta
router.post('/modificarTiempo/:marca/:categoria', isAuth, canUpdate, encuestasController.postModificarTiempo);

module.exports = router;