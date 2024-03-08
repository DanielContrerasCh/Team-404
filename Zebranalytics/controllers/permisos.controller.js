exports.get_permisos = (request, response, next) =>{
    response.render('permisos', {
        username: request.session.username || '',
    });
}

exports.post_permisos = (request, response, next) =>{
    request.session.username = request.body.username;
}