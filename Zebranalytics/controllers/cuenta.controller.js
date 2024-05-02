const Usuario = require('../models/usuario.model');

exports.get_cuenta = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    const success = request.session.success;
    request.session.success = '';
    response.render('account', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
        success: success || '',

    });
}

exports.post_cuenta = (request, response, next) =>{
    request.session.username = request.body.username;
    response.redirect('/')
}


exports.post_cuenta_editar = (request, response, next) =>{
    Usuario.changePassword(request.session.correo, request.body.password);
    request.session.success = 'Contraseña cambiada con éxito';
    response.redirect('/cuenta')
}