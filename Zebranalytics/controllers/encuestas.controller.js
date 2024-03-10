const Preguntas = require('../models/preguntas.model')


exports.post_luuna = (request, response, next) =>{
    console.log(request.body);
    const preguntas = new Preguntas(request.body.marca, request.body.pregunta, request.body.estado);
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/menu');})
        .catch((error) => {console.log(error)});
}

exports.get_luuna = (request, response, next) =>{
    Preguntas.fetchAll().then(([rows, fieldData]) => {
        console.log(rows);
        response.render('encuesta_luuna', {
        preguntas: rows,
        })
    })
        .catch(error => {
        console.log(error);
    });
}

exports.get_mappa = (request, response, next) =>{
    response.render('encuesta_mappa', {
        username: request.session.username || '',
    });
}

exports.post_mappa = (request, response, next) =>{
    request.session.username = request.body.username;
}

exports.get_nooz = (request, response, next) =>{
    response.render('encuesta_nooz', {
        username: request.session.username || '',
    });
}

exports.post_nooz = (request, response, next) =>{
    request.session.username = request.body.username;
}