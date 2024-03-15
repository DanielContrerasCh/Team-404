exports.get_personal = (request, response, next) =>{
    response.render('personal', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_personal = (request, response, next) =>{
    request.session.username = request.body.username;
}