exports.get_luuna = (request, response, next) =>{
    response.render('encuesta_luuna', {
        username: request.session.username || '',
    });
}

exports.post_luuna = (request, response, next) =>{
    request.session.username = request.body.username;
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