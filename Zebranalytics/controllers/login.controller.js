const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.login = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.callback = (request, response, next) => {
    if (request.user) {  // Usar request.user que es proporcionado por Passport después de la autenticación
        Usuario.getPermisos(request.user.CorreoEmpleado).then(([permisos, fieldData]) => {
            request.session.isLoggedIn = true;
            request.session.permisos = permisos; // Almacenar permisos en la sesión
            request.session.correo = request.user.CorreoEmpleado;
            request.session.username = request.user.Nombre;
            return request.session.save(err => {
                if (err) {
                    request.session.error = 'No se pudo autenticar con Google';
                    console.log(err); // Asegúrate de manejar los errores adecuadamente
                    return response.redirect('/');
                }
                response.redirect('/analiticas');
            });
        }).catch((error) => {
            request.session.error = 'No se pudo autenticar con Google';
            console.log(error);
            response.redirect('/');
        });
    } else {
        request.session.error = 'No se pudo autenticar con Google';
        response.redirect('/');
    }
};

exports.get_login = (request, response, next) =>{
    const error = request.session.error || '';
    response.render('login', {
        error: error,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_login = (request, response, next) =>{
    console.log(request.session);
    console.log(request.body);
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