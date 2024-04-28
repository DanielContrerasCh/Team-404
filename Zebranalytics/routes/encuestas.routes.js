const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth');
const canUpdate = require('../util/can-update-reviews');
const encuestasController = require('../controllers/encuestas.controller')
const categoriasController = require('../controllers/categorias.controller')
const multer = require('multer');

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Ruta genérica para Marcas 
router.get('/:marca', isAuth, canUpdate, encuestasController.getMarca);

//Ruta para añadir categorias
router.post('/:marca/agregarCategoria', isAuth, canUpdate, categoriasController.postNuevaCategoria);

// Ruta para editar categorías
router.post('/:marca/editarCategoria', isAuth, canUpdate, categoriasController.postEditarCategoria);

// Ruta para eliminar categorías
router.post('/:marca/eliminarCategoria', isAuth, canUpdate, categoriasController.postEliminarCategoria);

// Ruta génerica para encuestas de una categoría
router.get('/:marca/:categoria', isAuth, canUpdate, encuestasController.getNuevaEncuesta);

// Ruta para agregar pregunta
router.post('/:marca/:categoria', isAuth, canUpdate, encuestasController.postNuevaEncuesta);

// Ruta para eliminar encuesta
router.post('/deleteEncuesta/:marca/:categoria', isAuth, canUpdate, encuestasController.postDeleteEncuesta);

//Ruta para editar pregunta
router.post('/editarPregunta/:marca/:categoria', isAuth, canUpdate, encuestasController.postEditarPregunta);

// Ruta para eliminar 1 sola pregunta
router.post('/deletePregunta/:marca/:categoria', isAuth, canUpdate, encuestasController.postDeletePregunta);

// Ruta para editar opciones de una categoria
router.post('/editarOpcionesPregunta/:marca/:categoria', isAuth, canUpdate, encuestasController.postEditarOpcionesPregunta);

// Ruta para previsualizar la encuesta
router.get('/previsualizar/:marca/:categoria', isAuth, canUpdate, encuestasController.getPrevisualizarEncuesta)

// Ruta para modificar tiempo de encuesta
router.post('/modificarTiempo/:marca/:categoria', isAuth, canUpdate, encuestasController.postModificarTiempo);

// Ruta para eliminar una opción de pregunta
router.post('/eliminarOpcion', isAuth, canUpdate, encuestasController.postEliminarOpcion);

// Rutas para cargar imágenes
// Rutas para cargar imágenes
router.post('/uploadHeader/:marca/:categoria', isAuth, canUpdate, upload.single('imageFile'), encuestasController.uploadHeaderImage);
router.post('/uploadFooter/:marca/:categoria', isAuth, canUpdate, upload.single('imageFile'), encuestasController.uploadFooterImage);



module.exports = router;