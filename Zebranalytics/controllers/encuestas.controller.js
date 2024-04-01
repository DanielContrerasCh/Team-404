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

exports.get_luuna_new_colchones = (request, response, next) => {
    Preguntas.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('luuna_colchones', {
                preguntas: rows,
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
        })
        .catch(error => {
            console.log(error);
        });
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

exports.get_luuna_new_almohadas = (request, response, next) =>{
    Preguntas.fetchAll().then(([rows, fieldData]) => {
        response.render('luuna_almohadas', {
        preguntas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        })
    })
        .catch(error => {
        console.log(error);
    });
}

exports.post_luuna_new_almohadas = (request, response, next) => {
    const preguntas = new Preguntas(request.body.NombreMarca, request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, request.body.Categoria);
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_muebles = (request, response, next) =>{
    Preguntas.fetchAll().then(([rows, fieldData]) => {
        response.render('luuna_muebles', {
        preguntas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        })
    })
        .catch(error => {
        console.log(error);
    });
}

exports.post_luuna_new_muebles = (request, response, next) => {
    const preguntas = new Preguntas(request.body.NombreMarca, request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, request.body.Categoria);
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_blancos = (request, response, next) =>{
    Preguntas.fetchAll().then(([rows, fieldData]) => {
        response.render('luuna_blancos', {
        preguntas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        })
    })
        .catch(error => {
        console.log(error);
    });
}

exports.post_luuna_new_blancos = (request, response, next) => {
    const preguntas = new Preguntas(request.body.NombreMarca, request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, request.body.Categoria);
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_ninos = (request, response, next) =>{
    Preguntas.fetchAll().then(([rows, fieldData]) => {
        response.render('luuna_ninos', {
        preguntas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        })
    })
        .catch(error => {
        console.log(error);
    });
}

exports.post_luuna_new_ninos = (request, response, next) => {
    const preguntas = new Preguntas(request.body.NombreMarca, request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, request.body.Categoria);
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}