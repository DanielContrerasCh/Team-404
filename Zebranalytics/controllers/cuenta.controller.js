exports.get_cuenta = (request, response, next) =>{
    response.render('account', {
        username: request.session.username || '',
    });
}

exports.post_cuenta = (request, response, next) =>{
    request.session.username = request.body.username;
    response.redirect('/')
}
