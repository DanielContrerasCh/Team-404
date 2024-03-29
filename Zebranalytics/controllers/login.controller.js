const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_login = (request, response, next) =>{
    const error = request.session.error || '';
    response.render('login', {
        error: error,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_login = (request, response, next) =>{
    Usuario.fetchOne(request.body.correo) //Obtenemos la tabla de Usuario con el mismo correo
    .then(([users, fieldData]) => {
        if(users.length == 1) {
            //users[0] contiene el objeto de la respuesta de la consulta
            const user = users[0];
            bcrypt.compare(request.body.password, user.Password) //Comparamos contraseñas
                .then(doMatch => {
                    if (doMatch) { 
                        Usuario.getPermisos(user.CorreoEmpleado).then(([permisos, fieldData]) => {//Sacamos permisos del rol asignado
                            request.session.isLoggedIn = true;
                            request.session.permisos = permisos;
                            request.session.correo = user.correo;
                            return request.session.save(err => {
                                response.redirect('/analiticas'); //Mandamos a pagina principal
                            });
                        }).catch((error) => {console.log(error);});
                    } else {
                        request.session.error = 'El usuario y/o contraseña son incorrectos'
                        return response.redirect('/user/login');
                    }
                }).catch(err => {
                    response.redirect('/user/login');
                });
        } else {
            request.session.error = 'El usuario y/o contraseña son incorrectos'
            response.redirect('/user/login')
        }
    })
    .catch(err => {
        console.log(err)
    })
}

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/user/login'); //Este código se ejecuta cuando la sesión se elimina.
    });
};

exports.get_signup = (request, response, next) => {
    const error = request.session.error || '';
    response.render('/personal', {
        username: request.session.username || '',
        error: error,
        registrar: true,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_signup = (request, response, next) =>{
    const usuario = new Usuario(request.body.username, request.body.password);
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