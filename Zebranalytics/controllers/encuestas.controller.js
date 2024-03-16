const Preguntas = require('../models/preguntas.model')


exports.post_luuna_save = (request, response, next) =>{
    const preguntas = new Preguntas(request.body.NombreMarca, request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, request.body.Categoria);
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');})
        .catch((error) => {console.log(error)});
}

exports.post_luuna_modify = (request, response, next) =>{
    console.log(request.body)
    const preguntas = new Preguntas(request.body.NombreMarca, request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, request.body.Categoria);
    preguntas.modify()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');})
        .catch((error) => {console.log(error)});
}

exports.get_luuna = (request, response, next) =>{
    Preguntas.fetchAll().then(([rows, fieldData]) => {
        console.log(rows);
        response.render('encuesta_luuna', {
        preguntas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        })
    })
        .catch(error => {
        console.log(error);
    });
}

exports.get_mappa = (request, response, next) =>{
    response.render('encuesta_mappa', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_mappa = (request, response, next) =>{
    request.session.username = request.body.username;
}

exports.get_nooz = (request, response, next) =>{
    response.render('encuesta_nooz', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_nooz = (request, response, next) =>{
    request.session.username = request.body.username;
}