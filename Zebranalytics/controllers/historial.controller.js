const Preguntas = require('../models/preguntas.model');

exports.getHistorial = async (request, response, next) => {
    // Recuperar los valores de la sesión
    const error = request.session.error;
    const marca = request.session.marca;
    const categoria = request.session.categoria;

    // Verificar si la marca y categoría están definidas
    if (!marca || !categoria) {
        response.render('historialPreguntas', {
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            error: 'Marca o categoría no especificada.',
            historial: []
        });
        return;
    }

    try {
        // Llamar al modelo para obtener los datos del historial
        const historial = await Preguntas.fetchHistorialPorMarcaYCategoria(marca, categoria);

        // Renderizar la vista con los datos del historial
        response.render('historialPreguntas', {
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            error: error,
            historial: historial,
            marca: marca, // Opcional, si quieres usarlo en la vista
            categoria: categoria // Opcional, si quieres usarlo en la vista
        });
    } catch (err) {
        console.error('Error al obtener el historial:', err);
        response.render('historialPreguntas', {
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            error: 'Error al obtener el historial de modificaciones.',
            historial: []
        });
    }
};
