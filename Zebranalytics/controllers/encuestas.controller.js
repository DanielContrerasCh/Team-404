const Preguntas = require('../models/preguntas.model')
const bcrypt = require('bcryptjs');

// Controlador genérico para obtener la vista de marca
exports.get_marca = async (request, response, next) => {
    const marca = request.params.marca.toUpperCase();

    try {
        // Obtener todas las categorías para una marca específica
        const [categorias] = await Preguntas.fetchCategoriasPorMarca(marca);

        // Convertir los resultados en un array de nombres de categorías
        const nombresCategorias = categorias.map(categoria => categoria.categoria_nombre);

        // Renderizar vista pasando la marca y sus categorías
        response.render('marca_categorias', {
            marca: marca,
            categorias: nombresCategorias,
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken()
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
};

// Controlador para agregar categoria
exports.post_nueva_categoria = async (request, response, next) => {
    const { marca } = request.params;
    const { categoria_nombre } = request.body;

    try {
        const [categoriasExistentes] = await Preguntas.categoriaExiste(marca, categoria_nombre);

        if (categoriasExistentes.length > 0) {
            console.log('La categoría ya existe');
            return response.redirect(`/encuestas/${marca}?error=Categoría ya existe`);
        }

        await Preguntas.agregarCategoria(categoria_nombre, marca);
        console.log('Categoría agregada con éxito');

        response.redirect(`/encuestas/${marca.toLowerCase()}`);
    } catch (error) {
        console.log('Error al agregar categoría:', error);
        response.status(500).send('Error interno del servidor');
    }
};

// Controlador para editar categoria
exports.post_editar_categoria = async (request, response, next) => {
    const { marca } = request.params;
    const { categoria_actual, nuevo_nombre } = request.body;
    
    try {
        await Preguntas.renombrarCategoria(marca, categoria_actual, nuevo_nombre);
        console.log('Categoría renombrada con éxito');
        response.redirect(`/encuestas/${marca.toLowerCase()}?success=Categoría renombrada`);
    } catch (error) {
        console.log('Error al renombrar categoría:', error);
        response.status(500).send('Error interno del servidor al intentar renombrar la categoría');
    }
};

// Controlador para eliminar categoria
exports.post_eliminar_categoria = async (request, response, next) => {
    const { marca } = request.params;
    const { categoria_a_eliminar } = request.body;

    try {
        await Preguntas.eliminarCategoriaPorNombre(marca, categoria_a_eliminar);
        console.log('Categoría eliminada con éxito');
        response.redirect(`/encuestas/${marca.toLowerCase()}?success=Categoría eliminada`);
    } catch (error) {
        console.log('Error al eliminar categoría:', error);
        response.status(500).send('Error interno del servidor al intentar eliminar la categoría');
    }
};

// Controlador genérico para obtener la vista de una encuesta de una categoría específica
exports.get_nueva_encuesta = async (request, response, next) => {
    const { marca, categoria } = request.params;

    try {
        // La corrección principal es aquí, cambiando [encuestas] a [preguntas] para que coincida con lo que se espera en la vista
        const [preguntas] = await Preguntas.fetchByMarcaAndCategoria(marca.toUpperCase(), categoria.toUpperCase());
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;

        // Ahora pasas correctamente 'preguntas' a la vista
        response.render('encuesta_categoria', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: marca, 
            categoria: categoria 
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor al intentar obtener las preguntas');
    }
};


// Controlador para agregar preguntas a encuestas
exports.post_nueva_encuesta = async (request, response, next) => {
    const { marca, categoria } = request.params;
    const { EstadoObligatorio, TipoPregunta, Pregunta, Opciones } = request.body;

    try {
        const pregunta = new Preguntas(marca.toUpperCase(), EstadoObligatorio, TipoPregunta, Pregunta, categoria.toUpperCase());

        // Asumiendo que `pregunta.save()` devuelve una promesa que resuelve a [rows, fieldData]
        const [rows, fieldData] = await pregunta.save();

        if (Opciones && (TipoPregunta === 'Checkbox' || TipoPregunta === 'OpcionMultiple')) {
            const idPregunta = rows.insertId; // Asegúrate de que esta es la forma correcta de obtener el insertId
            const opcionesArray = Opciones.split(',').map(opcion => opcion.trim());
            await pregunta.saveOptions(idPregunta, opcionesArray);
        }

        response.redirect(`/encuestas/${marca}/${categoria}`);
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
};


// Controlador para eliminar Encuesta
exports.post_delete_encuesta = async (request, response, next) => {
    const marca = request.params.marca; // Obtener la marca de los parámetros de la URL
    const categoria = request.params.categoria; // Obtener la categoría de los parámetros de la URL

    try {
    // Eliminar todas las preguntas asociadas a la marca y categoría
    await Preguntas.deleteByMarcaAndCategoria(marca, categoria);

    // Redireccionar después de eliminar la encuesta
    response.redirect(`/encuestas/${marca}/${categoria}`); 

    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
        }
};


// Controlador para Editar pregunta de la encuesta
exports.post_editar_pregunta = async (request, response, next) => {
    try {
    const idPregunta = request.body.idpreguntacambiar;

    // Verificar si el ID de la pregunta existe en la base de datos
    const preguntaExistente = await Preguntas.obtener_pregunta_por_id(idPregunta);
        if (!preguntaExistente) {
        // Si la pregunta no existe, redirigir a la ruta /brands
            return response.redirect('/brands');
  }

    // Si la pregunta existe, proceder a editarla
    await Preguntas.edit_pregunta(
        idPregunta,
        request.body.pregunta,
        request.body.obligatorio,
        request.body.tipo_pregunta
     );

    response.redirect('/brands'); // Redireccionar después de actualizar pregunta
        } catch (error) {
            console.log(error);
            response.status(500).send('Error interno del servidor');
        }
};