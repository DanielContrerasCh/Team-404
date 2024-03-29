const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.get_personal = (request, response, next) =>{
    Usuario.fetchAll().then(([rows, fieldData]) => { //Cargamos todos nuestros empleados en personal
        console.log(rows);
        response.render('personal', {
        personal: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        })
    })
    .catch(error => {
        console.log(error);
    });
}

exports.post_personal = (request, response, next) =>{
    //Creamos objeto usuario con los datos del request para agregar un empleado
    const usuario = new Usuario(request.body.nombre, request.body.correo, request.body.password, request.body.rol);
    usuario.save() //Llamamos el método save del modelo para guardar los datos
        .then(([rows, fieldData]) => {
            response.redirect('/personal');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Nombre de usuario invalido';
            response.redirect('/personal');
        })
}