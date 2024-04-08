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
                            request.session.correo = user.CorreoEmpleado;
                            request.session.username = user.Nombre;
                            return request.session.save(err => {
                                response.redirect('/analiticas'); //Mandamos a pagina principal
                            });
                        }).catch((error) => {console.log(error);});
                    } else {
                        request.session.error = 'El usuario y/o contraseña son incorrectos'
                        return response.redirect('/');
                    }
                }).catch(err => {
                    response.redirect('/');
                });
        } else {
            request.session.error = 'El usuario y/o contraseña son incorrectos'
            response.redirect('/')
        }
    })
    .catch(err => {
        console.log(err)
    })
}

exports.get_logout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); //Este código se ejecuta cuando la sesión se elimina.
    });
};