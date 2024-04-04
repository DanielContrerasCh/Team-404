const Preguntas = require('../models/preguntas.model')
const bcrypt = require('bcryptjs');

// LUUNA 
exports.get_luuna = (request, response, next) =>{
    console.log('Ruta /luuna');
    response.render('encuesta_luuna', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    })
}

exports.get_luuna_new_colchones = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Colchones');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_colchones', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'LUUNA', // Define la variable marca
            categoria: 'Colchones' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_luuna_new_colchones = async (request, response, next) => {
    const { EstadoObligatorio, TipoPregunta, Pregunta, Opciones } = request.body;
    const preguntas = new Preguntas('LUUNA', EstadoObligatorio, TipoPregunta, Pregunta, 'Colchones');
    
    preguntas.save()
        .then(([rows, fieldData]) => {
            // Verifica si la pregunta es de tipo 'Checkbox' o 'Opción Múltiple' y tiene opciones definidas
            if ((TipoPregunta === 'Checkbox' || TipoPregunta === 'OpcionMultiple') && Opciones) {
                // Divide las opciones por comas y elimina espacios en blanco
                const opcionesArray = Opciones.split(',').map(opcion => opcion.trim());
                // Obtiene el ID de la última pregunta insertada para asociar las opciones
                const idPregunta = rows.insertId;
                // Guarda las opciones de la pregunta
                return preguntas.saveOptions(idPregunta, opcionesArray);
            }
        })
        .then(() => {
            response.redirect('/encuestas/luuna_new_colchones');
        })
        .catch((error) => {
            console.log(error);
            response.status(500).send('Error interno del servidor');
        });
}


exports.get_luuna_new_almohadas = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Almohadas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_almohadas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'LUUNA', // Define la variable marca
            categoria: 'Almohadas' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_luuna_new_almohadas = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Almohadas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna_new_almohadas');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_muebles = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Muebles');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_muebles', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'LUUNA', // Define la variable marca
            categoria: 'Muebles' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }

}

exports.post_luuna_new_muebles = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Muebles');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna_new_muebles');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_blancos = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Blancos');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_blancos', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'LUUNA', // Define la variable marca
            categoria: 'Blancos' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_luuna_new_blancos = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Blancos');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna_new_blancos');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_ninos = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Ninos');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_ninos', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'LUUNA', // Define la variable marca
            categoria: 'Ninos' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_luuna_new_ninos = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Ninos');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna_new_ninos');
        })
        .catch((error) => {
            console.log(error);
        });
}

// Mappa
exports.get_mappa = (request, response, next) =>{
    console.log('Ruta /mappa');
    response.render('encuesta_mappa', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    })
}

exports.get_mappa_new_maletas = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('MAPPA', 'Maletas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('mappa_maletas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'MAPPA', // Define la variable marca
            categoria: 'Maletas' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_mappa_new_maletas = (request, response, next) => {
    const preguntas = new Preguntas('MAPPA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Maletas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/mappa_new_maletas');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_mappa_new_mochilas = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('MAPPA', 'Mochilas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('mappa_mochilas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'MAPPA', // Define la variable marca
            categoria: 'Mochilas' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_mappa_new_mochilas = (request, response, next) => {
    const preguntas = new Preguntas('MAPPA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Mochilas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/mappa_new_mochilas');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_mappa_new_accesorios = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('MAPPA', 'Accesorios');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('mappa_accesorios', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'MAPPA', // Define la variable marca
            categoria: 'Accesorios' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_mappa_new_accesorios = (request, response, next) => {
    const preguntas = new Preguntas('MAPPA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Accesorios');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/mappa_new_accesorios');
        })
        .catch((error) => {
            console.log(error);
        });
}

// Nooz 
exports.get_nooz = (request, response, next) =>{
    console.log('Ruta /nooz');
    response.render('encuesta_nooz', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    })
}

exports.get_nooz_new_colchones = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Colchones');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_colchones', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'NOOZ', // Define la variable marca
            categoria: 'Colchones' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_colchones = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Colchones');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz_new_colchones');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_nooz_new_almohadas = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Almohadas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_almohadas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'NOOZ', // Define la variable marca
            categoria: 'Almohadas' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_almohadas = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Almohadas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz_new_almohadas');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_nooz_new_camas = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Camas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_camas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'NOOZ', // Define la variable marca
            categoria: 'Camas' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_camas = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Camas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz_new_camas');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_nooz_new_blancos = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Blancos');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_blancos', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'NOOZ', // Define la variable marca
            categoria: 'Blancos' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_blancos = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Blancos');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz_new_blancos');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_nooz_new_accesorios = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Accesorios');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_accesorios', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            marca: 'NOOZ', // Define la variable marca
            categoria: 'Accesorios' // Define la variable categoria
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_accesorios = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Accesorios');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz_new_accesorios');
        })
        .catch((error) => {
            console.log(error);
        });
}

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

// Editar opciones de pregunta
exports.post_editar_pregunta_opcion = async (request, response, next) => {
    try {
        const idPreguntaOpcion = request.body.idopcionpreguntacambiar;

        // Verificar si el ID de la pregunta existe en la base de datos
        const preguntaExistente = await Preguntas.obtener_pregunta_por_id(idPreguntaOpcion);
        if (!preguntaExistente) {
            // Si la pregunta no existe, redirigir a la ruta /brands
            return response.redirect('/brands');
        }

        // Si la pregunta existe, proceder a editarla
        await Preguntas.edit_pregunta(
            idPreguntaOpcion,
            request.body.opciones
        );

        response.redirect('/brands'); // Redireccionar después de actualizar pregunta
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}