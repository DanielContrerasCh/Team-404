const DataPermisos = require('../models/permisos.model');


exports.get_permisos = (request, response, next) =>{

    DataPermisos.fetchAll().then(([rows, fieldData]) => { //Cargamos los permisos
        
        // Renderiza la view
        response.render('permisos', {
        // asigna a dataPermisos el valor de las rows
        dataPermisos: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        })
    })
    .catch(error => {
        console.log(error);
    });

}

exports.post_permisos = (request, response, next) =>{
    request.session.username = request.body.username;
}

exports.post_asignar_permiso = (request, response, next) =>{
    console.log(request.body.rol)
    console.log(request.body.idpermiso)
    request.session.username = request.body.username;
    DataPermisos.asigna(request.body.rol, request.body.idpermiso)

    .then(([rows, fieldData]) => {
        response.redirect('/permisos');
    })
    .catch((error) => {
        console.log(error)
        request.session.error = 'Error al asignar permiso';
        response.redirect('/permisos');
    })
}

exports.post_desasignar_permiso = (request, response, next) =>{
    request.session.username = request.body.username;
    DataPermisos.desasigna(request.body.rol, request.body.idpermiso)

    .then(([rows, fieldData]) => {
        response.redirect('/permisos');
    })
    .catch((error) => {
        console.log(error)
        request.session.error = 'Error al desasignar permiso';
        response.redirect('/permisos');
    })
}