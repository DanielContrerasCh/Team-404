const Categorias = require('../models/categorias.model')
const bcrypt = require('bcryptjs');


// Controlador para agregar categoria
exports.postNuevaCategoria = async (request, response, next) => {
    const { marca } = request.params;
    const { categoria_nombre } = request.body;

    // Verificar si el nombre de la categoría supera los 50 caracteres
    if (categoria_nombre.length > 50) {
        request.session.error = 'El nombre de la categoría no puede tener más de 50 caracteres';
        return response.redirect(`/encuestas/${marca.toLowerCase()}`);
    }

    try {
        const [categoriasExistentes] = await Categorias.categoriaExiste(marca, categoria_nombre);

        if (categoriasExistentes.length > 0) {
            console.log('La categoría ya existe');
            request.session.error = 'Categoría ya existe';
            return response.redirect(`/encuestas/${marca.toLowerCase()}`);
        }

        await Categorias.agregarCategoria(categoria_nombre, marca);
        console.log('Categoría agregada con éxito');

        response.redirect(`/encuestas/${marca.toLowerCase()}`);
    } catch (error) {
        console.log('Error al agregar categoría:', error);
        response.status(500).send('Error interno del servidor');
    }
};


// Controlador para editar categoria
exports.postEditarCategoria = async (request, response, next) => {
    const { marca } = request.params;
    const { categoria_actual, nuevo_nombre } = request.body;

    // Verificar si el nombre de la categoría supera los 50 caracteres
    if (nuevo_nombre.length > 50) {
        request.session.error = 'El nombre de la categoría no puede tener más de 50 caracteres';
        return response.redirect(`/encuestas/${marca.toLowerCase()}`);
    }
    
    try {
        await Categorias.renombrarCategoria(marca, categoria_actual, nuevo_nombre);
        console.log('Categoría renombrada con éxito');
        response.redirect(`/encuestas/${marca.toLowerCase()}?success=Categoría renombrada`);
    } catch (error) {
        console.log('Error al renombrar categoría:', error.message);
        if (error.message === 'Categoría ya existe') {
            request.session.error = 'Categoría ya existe'; 
            return response.redirect(`/encuestas/${marca.toLowerCase()}`);
        } else {
            response.status(500).send('Error interno del servidor al intentar renombrar la categoría');
        }
    }
};


// Controlador para eliminar categoria
exports.postEliminarCategoria = async (request, response, next) => {
    const { marca } = request.params;
    const { categoria_a_eliminar } = request.body;

    try {
        await Categorias.eliminarCategoriaPorNombre(marca, categoria_a_eliminar);
        console.log('Categoría eliminada con éxito');
        response.redirect(`/encuestas/${marca.toLowerCase()}?success=Categoría eliminada`);
    } catch (error) {
        console.log('Error al eliminar categoría:', error);
        response.status(500).send('Error interno del servidor al intentar eliminar la categoría');
    }
};