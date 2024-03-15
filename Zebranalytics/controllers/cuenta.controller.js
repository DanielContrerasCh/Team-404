exports.get_cuenta = (request, response, next) =>{
    response.render('account', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_cuenta = (request, response, next) =>{
    request.session.username = request.body.username;
    response.redirect('/')
}
