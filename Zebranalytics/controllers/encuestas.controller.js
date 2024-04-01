const Preguntas = require('../models/preguntas.model')
const bcrypt = require('bcryptjs');

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
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_luuna_new_colchones = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Colchones');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
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
            response.redirect('/encuestas/luuna');
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
            response.redirect('/encuestas/luuna');
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
            response.redirect('/encuestas/luuna');
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
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}