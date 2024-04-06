const Preguntas = require('../models/preguntas.model')
const bcrypt = require('bcryptjs');

// Controlador genérico para obtener la vista de marca
exports.get_marca = async (request, response, next) => {
    const marca = request.params.marca.toUpperCase();

    try {
        // Obtener todas las preguntas para una marca específica
        const [preguntas] = await Preguntas.fetchByMarcaAndCategoria(marca, '%'); // Asumiendo que este método puede manejar un wildcard '%' para categoría

        // Extraer categorías únicas
        const categorias = [...new Set(preguntas.map(pregunta => pregunta.Categoria))];

        // Renderizar vista pasando la marca y sus categorías
        response.render('marca_categorias', {
            marca: marca,
            categorias: categorias, // Esto asume que cada pregunta tiene una categoría y se extraen categorías únicas
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken() // Asegúrate de pasar el csrfToken si lo estás utilizando en tus formularios
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
};

// agregar categoria
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



// Controlador genérico para editar encuesta de una categoria
exports.get_nueva_encuesta = async (request, response, next) => {
    const { marca, categoria } = request.params;
    // Similar al anterior, pero filtrando también por categoría.
}

exports.post_nueva_encuesta = async (request, response, next) => {
    const { marca, categoria } = request.params; // Extraemos marca y categoría de los parámetros de la ruta
    const { EstadoObligatorio, TipoPregunta, Pregunta, Opciones } = request.body; // Extraemos la información de la pregunta desde el cuerpo de la solicitud

    try {
        // Creamos una instancia de la pregunta con la información recibida
        const pregunta = new Preguntas(marca.toUpperCase(), EstadoObligatorio, TipoPregunta, Pregunta, categoria);

        // Guardamos la pregunta en la base de datos
        const result = await pregunta.save();

        // Si la pregunta permite opciones, las guardamos también
        if (Opciones && (TipoPregunta === 'Checkbox' || TipoPregunta === 'OpcionMultiple')) {
            // Suponiendo que el método 'save' retorna el ID de la pregunta insertada, lo usamos para guardar las opciones
            // Esto es un ejemplo, debes ajustar según cómo tu método 'save' funcione realmente
            const idPregunta = result.insertId; 
            await pregunta.saveOptions(idPregunta, Opciones.split(',')); // Suponiendo que las opciones vienen separadas por comas
        }

        // Redirigimos al usuario a la vista de la categoría dentro de la marca, para que vea la pregunta recién agregada
        response.redirect(`/encuestas/${marca}/new/${categoria}`);
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
};




// Eliminar Encuesta
exports.post_delete_encuesta = async (request, response, next) => {
    const marca = request.params.marca; // Obtener la marca de los parámetros de la URL
    const categoria = request.params.categoria; // Obtener la categoría de los parámetros de la URL

    try {
        // Eliminar todas las preguntas asociadas a la marca y categoría
        await Preguntas.deleteByMarcaAndCategoria(marca, categoria);

        // Redireccionar después de eliminar la encuesta
        response.redirect('/encuestas/' + marca); 

    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

// Editar Encuesta
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
}