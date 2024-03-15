const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_personal = (request, response, next) =>{
    response.render('personal', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_personal = (request, response, next) =>{
    console.log("´post")
    const usuario = new Usuario(request.body.nombre, request.body.correo, request.body.password);
    console.log(usuario)
    usuario.save()
        .then(([rows, fieldData]) => {
            response.redirect('/personal');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Nombre de usuario invalido';
            response.redirect('/personal');
        })
}