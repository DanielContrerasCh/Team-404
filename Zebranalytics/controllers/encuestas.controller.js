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

// Controlador genérico para obtener la vista de una encuesta de una categoría específica
exports.get_nueva_encuesta = async (request, response, next) => {
    const { marca, categoria } = request.params;

    try {
        const [preguntas] = await Preguntas.fetchByMarcaAndCategoria(marca, categoria);

        for (let pregunta of preguntas) {
            const [opciones] = await Preguntas.fetchOpcionesPorPregunta(pregunta.IDPreguntas);
            console.log(opciones); // Agrega esta línea para depurar
            pregunta.opciones = opciones.map((opcion) => ({
                IDOpcion: opcion.IDopcion, // Asegúrate de que este nombre coincide con el nombre de la columna en tu base de datos
                TextoOpcion: opcion.TextoOpcion // Ídem anterior
            }));
        }
        

        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;

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
        const pregunta = new Preguntas(marca, EstadoObligatorio, TipoPregunta, Pregunta, categoria);

        // Asumiendo que `pregunta.save()` devuelve una promesa que resuelve a [rows, fieldData]
        const [rows, fieldData] = await pregunta.save();

        if (Opciones && (TipoPregunta === 'Checkbox' || TipoPregunta === 'OpcionMultiple')) {
            const idPregunta = rows.insertId; // Asegúrate de que esta es la forma correcta de obtener el insertId
            const opcionesArray = Opciones.split(',').map(opcion => opcion.trim());
            await Preguntas.saveOptions(idPregunta, opcionesArray);
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
    const marca = request.params.marca;
    const categoria = request.params.categoria;

    try {
        const idPregunta = request.body.idpreguntacambiar;
        const tipoPregunta = request.body.tipo_pregunta;
        const opciones = request.body.Opciones;

        const preguntaExistente = await Preguntas.obtener_pregunta_por_id(idPregunta);
        if (!preguntaExistente) {
            return response.redirect(`/encuestas/${marca}/${categoria}`);
        }

        await Preguntas.edit_pregunta(
            idPregunta,
            request.body.pregunta,
            request.body.obligatorio,
            tipoPregunta
        );

        // Si el tipo de pregunta ha cambiado a "Checkbox" o "Opción Múltiple", actualizar opciones
        if (opciones && (tipoPregunta === 'Checkbox' || tipoPregunta === 'OpcionMultiple')) {
            // Eliminar opciones existentes antes de guardar las nuevas
            await Preguntas.deleteOptions(idPregunta);
            const opcionesArray = opciones.split(',').map(opcion => opcion.trim());
            await Preguntas.saveOptions(idPregunta, opcionesArray);
        }

        response.redirect(`/encuestas/${marca}/${categoria}`);
    } catch (error) {
        console.log(error);
        if (!response.headersSent) {
            response.status(500).send('Error interno del servidor');
        }
    }
};

// Controlador para eliminar 1 pregunta
exports.post_delete_pregunta = async (request, response, next) => {
    const marca = request.params.marca;
    const categoria = request.params.categoria;
    const idPregunta = request.params.id || request.body.id; // Asegúrate de obtener correctamente el ID

    try {
        await Preguntas.deleteById(idPregunta); 
        response.redirect(`/encuestas/${marca}/${categoria}`);
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
};

// Controlador para editar opciones de una pregunta
exports.post_editar_opciones_pregunta = async (request, response, next) => {
    const marca = request.params.marca;
    const categoria = request.params.categoria;
    const idOpcion = request.body.IDopcion; 
    const textoOpcion = request.body.TextoOpcion;

    // Verifica si alguno es indefinido
    if (typeof idOpcion === 'undefined' || typeof textoOpcion === 'undefined') {
        console.log('idOpcion o TextoOpcion no definidos');
        return response.status(400).send('Los datos necesarios no están completos.');
    }

    try {
        await Preguntas.edit_pregunta_opciones(idOpcion, textoOpcion);
        response.redirect(`/encuestas/${marca}/${categoria}`);
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor al intentar editar la opción');
    }
};

// Controlador para previsualizar encuesta
exports.get_previsualizar_encuesta = async (request, response, next) => {
    const { marca, categoria } = request.params;

    try {
        const preguntas = await Preguntas.fetchEncuestasPorMarcaYCategoria(marca, categoria);

        for (let pregunta of preguntas) {
            const [opciones] = await Preguntas.fetchOpcionesPorPregunta(pregunta.IDPreguntas);
            pregunta.opciones = opciones.map(opcion => ({
                id: opcion.IDopcion,
                texto: opcion.TextoOpcion
            }));
        }

        response.render('previsualizar_encuesta', {
            preguntas,
            marca,
            categoria,
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken()
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
};
