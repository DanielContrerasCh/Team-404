exports.get_luuna = (request, response, next) =>{
    response.render('encuesta_luna', {
        username: request.session.username || '',
    });
}

exports.post_luuna = (request, response, next) =>{
    request.session.username = request.body.username;
}


exports.get_luuna_colchones = (request, response, next) =>{
    response.render('encuesta_luna_colchones', {
        username: request.session.username || '',
    });
}