const Preguntas = require('../models/preguntas.model')
const bcrypt = require('bcryptjs');

// Controlador genérico para obtener la vista de marca
exports.getMarca = async (request, response, next) => {
    const marca = request.params.marca.toUpperCase();
    const error = request.session.error;
    request.session.error = '';
    const success = request.session.success;
    request.session.success = '';

    try {
        // Obtener todas las categorías para una marca específica
        const [categorias] = await Preguntas.fetchCategoriasPorMarca(marca);

        // Convertir los resultados en un array de nombres de categorías
        const nombresCategorias = categorias.map(categoria => categoria.categoria_nombre);

        // Renderizar vista pasando la marca y sus categorías
        response.render('marcaCategorias', {
            marca: marca,
            categorias: nombresCategorias,
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
            error: error,
            success: success,
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
};

// Controlador genérico para obtener la vista de una encuesta de una categoría específica
exports.getNuevaEncuesta = async (request, response, next) => {
    const { marca, categoria } = request.params;
    request.session.marca = marca; // Establecer la marca en la sesión
    request.session.categoria = categoria; // Establecer la categoría en la sesión
    const error = request.session.error;
    request.session.error = '';
    const success = request.session.success;
    request.session.success = '';

    try {
        let [rows, fieldData] = await Preguntas.obtenerTiempo(marca, categoria);
        const tiempoActual = rows;

        const [preguntas] = await Preguntas.fetchByMarcaAndCategoria(marca, categoria);

        for (let pregunta of preguntas) {
            const [opciones] = await Preguntas.fetchOpcionesPorPregunta(pregunta.IDPreguntas);
            pregunta.opciones = opciones.map((opcion) => ({
                IDOpcion: opcion.IDopcion, 
                TextoOpcion: opcion.TextoOpcion
            }));
        }
        

        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;

        response.render('encuestaCategoria', {
            tiempoActual: tiempoActual[0].TiempoEncuesta,
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: marca,
            categoria: categoria,
            error: error,
            success: success,
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor al intentar obtener las preguntas');
    }
};

// Controlador para agregar preguntas a encuestas
exports.postNuevaEncuesta = async (request, response, next) => {
    const { marca, categoria } = request.params;
    const { EstadoObligatorio, TipoPregunta, Pregunta, Opciones } = request.body;
    const correo = request.session.correo;

    // Validación para la longitud de la pregunta
    if (Pregunta.length > 150) {
        request.session.error = 'La pregunta no puede tener más de 150 caracteres';
        return response.redirect(`/encuestas/${marca}/${categoria}`);
    }

    try {
        const pregunta = new Preguntas(marca, EstadoObligatorio, TipoPregunta, Pregunta, categoria);
        
        const [rows, fieldData] = await pregunta.save(correo);

        if (Opciones && (TipoPregunta === 'Checkbox' || TipoPregunta === 'OpcionMultiple')) {
            const idPregunta = rows.insertId;
            const opcionesArray = Opciones.split('&').map(opcion => opcion.trim());

            // Verificar la longitud de cada opción antes de proceder
            const opcionesLargas = opcionesArray.some(opcion => opcion.length > 100);
            if (opcionesLargas) {
                throw new Error('Una o más opciones superan el límite de 100 caracteres');
            }

            await Preguntas.saveOptions(idPregunta, opcionesArray);
        }
        request.session.success = 'Pregunta agregada con éxito';
        response.redirect(`/encuestas/${marca}/${categoria}`);
    } catch (error) {
        console.log('Error al procesar la solicitud:', error);
        request.session.error = error.message;
        if (!response.headersSent) {
            response.status(500).redirect(`/encuestas/${marca}/${categoria}`);
        }
    }
};


// Controlador para eliminar Encuesta
exports.postDeleteEncuesta = async (request, response, next) => {
    const marca = request.params.marca; 
    const categoria = request.params.categoria; 

    try {
    // Eliminar todas las preguntas asociadas a la marca y categoría
    await Preguntas.deleteByMarcaAndCategoria(marca, categoria);

    // Redireccionar después de eliminar la encuesta
    request.session.success = 'Encuesta eliminada con éxito';
    response.redirect(`/encuestas/${marca}/${categoria}`); 

    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
        }
};


// Controlador para Editar pregunta de la encuesta
exports.postEditarPregunta = async (request, response, next) => {
    const marca = request.params.marca;
    const categoria = request.params.categoria;
    const correo = request.session.correo;

    const nuevaPregunta = request.body.pregunta;
    const opciones = request.body.Opciones;

    // Validación de la longitud de la pregunta
    if (nuevaPregunta.length > 150) {
        request.session.error = 'La pregunta no puede tener más de 150 caracteres';
        return response.redirect(`/encuestas/${marca}/${categoria}`);
    }

    try {
        const idPregunta = request.body.idpreguntacambiar;
        const tipoPregunta = request.body.tipo_pregunta;

        const preguntaExistente = await Preguntas.obtenerPreguntaPorId(idPregunta);
        if (!preguntaExistente) {
            return response.redirect(`/encuestas/${marca}/${categoria}`);
        }

        await Preguntas.editPregunta(
            idPregunta,
            nuevaPregunta,
            request.body.obligatorio,
            tipoPregunta,
            correo
        );

        if (opciones && (tipoPregunta === 'Checkbox' || tipoPregunta === 'OpcionMultiple')) {
            const opcionesArray = opciones.split('&').map(opcion => opcion.trim());
            // Verificar la longitud de cada opción
            const opcionesLargas = opcionesArray.some(opcion => opcion.length > 100);
            if (opcionesLargas) {
                throw new Error('Una o más opciones superan el límite de 100 caracteres');
            }

            // Eliminar opciones existentes antes de guardar las nuevas
            await Preguntas.deleteOptions(idPregunta);
            await Preguntas.saveOptions(idPregunta, opcionesArray);
        }
        request.session.success = 'Pregunta editada con éxito';
        response.redirect(`/encuestas/${marca}/${categoria}`);
    } catch (error) {
        console.log('Error al procesar la solicitud:', error);
        request.session.error = error.message; 
        if (!response.headersSent) {
            response.status(500).redirect(`/encuestas/${marca}/${categoria}`);
        }
    }
};

// Controlador para eliminar 1 pregunta
exports.postDeletePregunta = async (request, response, next) => {
    const marca = request.params.marca;
    const categoria = request.params.categoria;
    const idPregunta = request.params.id || request.body.id; 
    const correo = request.session.correo;

    try {
        await Preguntas.deleteById(idPregunta, correo); 
        request.session.success = 'Pregunta eliminada con éxito';
        response.redirect(`/encuestas/${marca}/${categoria}`);
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
};

// Controlador para editar opciones de una pregunta
exports.postEditarOpcionesPregunta = async (request, response, next) => {
    const marca = request.params.marca;
    const categoria = request.params.categoria;
    const idOpcion = request.body.IDopcion; 
    const textoOpcion = request.body.TextoOpcion;

    // Verifica si alguno es indefinido
    if (typeof idOpcion === 'undefined' || typeof textoOpcion === 'undefined') {
        console.log('idOpcion o TextoOpcion no definidos');
        return response.status(400).send('Los datos necesarios no están completos.');
    }

    // Verifica si el texto de la opción contiene el carácter '&'
    if (textoOpcion.includes('&')) {
        request.session.error = 'La opción no se puede registrar con &';
        return response.redirect(`/encuestas/${marca}/${categoria}`);
    }

    // Validación de la longitud del texto de la opción
    if (textoOpcion.length > 100) {
        request.session.error = 'La opción no puede tener más de 100 caracteres';
        return response.redirect(`/encuestas/${marca}/${categoria}`);
    }

    try {
        await Preguntas.editPreguntaOpciones(idOpcion, textoOpcion);
        request.session.success = 'Opción editada con éxito';
        return response.redirect(`/encuestas/${marca}/${categoria}`);
    } catch (error) {
        console.log('Error al intentar editar la opción:', error);
        request.session.error = 'Error interno del servidor al intentar editar la opción';
        return response.status(500).redirect(`/encuestas/${marca}/${categoria}`);
    }
};



// Controlador para previsualizar encuesta
exports.getPrevisualizarEncuesta = async (request, response, next) => {
    const { marca, categoria } = request.params;
    const error = request.session.error;
    request.session.error = '';
    

    try {
        const preguntas = await Preguntas.fetchEncuestasPorMarcaYCategoria(marca, categoria);

        for (let pregunta of preguntas) {
            const [opciones] = await Preguntas.fetchOpcionesPorPregunta(pregunta.IDPreguntas);
            pregunta.opciones = opciones.map(opcion => ({
                id: opcion.IDopcion,
                texto: opcion.TextoOpcion
            }));
        }

        response.render('previsualizarEncuesta', {
            preguntas,
            marca,
            categoria,
            permisos: request.session.permisos || [],
            csrfToken: request.csrfToken(),
            error: error,

        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
};

// Controlador para modificar tiempo de encuesta
exports.postModificarTiempo = async (request, response, next) => {
    const marca = request.params.marca;
    const categoria = request.params.categoria;
    const tiempo = request.body.dias;

    try {
        
        const [rows, fieldData] = await Preguntas.obtenerTiempo(marca, categoria);
        const tiempoActual = rows;
        if (tiempo == tiempoActual[0].TiempoEncuesta) {
            request.session.error = 'El tiempo ingresado es igual al actual';
            return response.redirect(`/encuestas/${marca}/${categoria}`);
        }

        await Preguntas.updateTiempo(marca, categoria, tiempo);
        request.session.success = 'Tiempo modificado con éxito';
        response.redirect(`/encuestas/${marca}/${categoria}`);
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.postEliminarOpcion = (request, response, next) => {
    const idOpcion = request.body.idOpcion;
    const marca = request.body.marca;
    const categoria = request.body.categoria;

    Preguntas.deleteOption(idOpcion)
        .then(() => {
            request.session.success = 'Opción eliminada con éxito';
            return response.redirect(`/encuestas/${marca}/${categoria}`);
        })
        .catch(err => {
            console.error('Error al eliminar la opción:', err);
            response.status(500).send('Error interno del servidor al intentar eliminar la opción');
        });
};
