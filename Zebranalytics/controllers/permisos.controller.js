exports.get_permisos = (request, response, next) =>{
    response.render('permisos', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_permisos = (request, response, next) =>{
    request.session.username = request.body.username;
}