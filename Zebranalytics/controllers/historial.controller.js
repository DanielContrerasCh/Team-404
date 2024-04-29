const Preguntas = require('../models/preguntas.model');

exports.getHistorial = async (request, response, next) => {
    const error = request.session.error;
    request.session.error = '';
    const marca = request.session.marca;
    const categoria = request.session.categoria;

    if (!marca || !categoria) {
        response.render('historialPreguntas', {
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            error: 'Marca o categoría no especificada.',
            historial: [],
            conteoModificaciones: {}
        });
        return;
    }

    try {
        const historial = await Preguntas.fetchHistorialPorMarcaYCategoria(marca, categoria);
        const error = request.session.error;
        request.session.error = '';
        // Contar modificaciones por correo
        const conteoModificaciones = {};
        historial.forEach(item => {
            conteoModificaciones[item.Correo] = (conteoModificaciones[item.Correo] || 0) + 1;
        });



        response.render('historialPreguntas', {
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            error: error,
            historial: historial,
            marca: marca,
            categoria: categoria,
            conteoModificaciones: conteoModificaciones
        });
    } catch (err) {
        console.error('Error al obtener el historial:', err);
        response.render('historialPreguntas', {
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            error: 'Error al obtener el historial de modificaciones.',
            historial: [],
            conteoModificaciones: {}
        });
    }
};
