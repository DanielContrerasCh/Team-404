const DataPermisos = require('../models/permisos.model');


exports.get_permisos = (request, response, next) => {
    DataPermisos.fetchRoles()
    .then(([roles, fieldData]) => {
        // Para paginacion NOTA: SE LE RESTA 1 A LA LONGITUD DE ROLES POR EL ROL QUE NO SE MUESTRA
        const itemsPerPage = 8;

        const totalPages = Math.ceil(roles.length/itemsPerPage);
        const page = parseInt(request.query.page) || 1;

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, roles.length);

        // Extraer las marcas de la página actual
        const paginatedRoles = roles.slice(startIndex, endIndex);

        return {
            paginatedRoles: paginatedRoles, // Return paginatedRoles along with other values
            totalPages: totalPages,
            currentPage: page,
            startIndex: startIndex,
            endIndex: endIndex
        };
    })
    .then(({ paginatedRoles, totalPages, currentPage, startIndex, endIndex }) => {
        return DataPermisos.fetchAll()
        .then(([rows, fieldData]) => {
            const error = request.session.error || '';
            request.session.error = '';
            const success = request.session.success || '';
            request.session.success = '';

            // Renderiza la view
            response.render('permisos', {
                
                totalRoles: paginatedRoles, // Change totalRoles to paginatedRoles.length
                dataPermisos: rows,
                totalPages: totalPages,
                currentPage: currentPage,
                startIndex: startIndex,
                endIndex: endIndex,
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
                error: error || '',
                success: success || '',
            });
        });
    })
    .catch(error => {
        console.log(error);
    });
}


exports.post_asignar_permiso = (request, response, next) =>{
    DataPermisos.asigna(request.body.rol, request.body.idpermiso)

    .then(([rows, fieldData]) => {
        request.session.success = 'Permiso asignado correctamente';
        response.redirect('/permisos');
    })
    .catch((error) => {
        console.log(error)
        request.session.error = 'Error al asignar permiso';
        response.redirect('/permisos');
    })
}

exports.post_desasignar_permiso = (request, response, next) =>{
    DataPermisos.desasigna(request.body.deleteRol, request.body.deleteIdPermiso)

    .then(([rows, fieldData]) => {
        request.session.success = 'Permiso desasignado correctamente';
        response.redirect('/permisos');
    })
    .catch((error) => {
        console.log(error)
        request.session.error = 'Error al desasignar permiso';
        response.redirect('/permisos');
    })
}

exports.getNewRol = (request, response, next) =>{
    DataPermisos.fetchPermisos().then(([rows, fieldData]) => { //Cargamos los permisos
        const error = request.session.error;
        request.session.error = '';
        // Renderiza la view
        response.render('newRol', {
        // asigna a dataPermisos el valor de las rows
        totalPermisos: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
        })
    })
    .catch(error => {
        console.log(error);
    });
}


exports.postNewRol = (request, response, next) => {
    const permisos = request.body.permisos;
    const correo = request.session.correo;
    if (permisos == undefined) {
        request.session.error = 'No se pueden tener roles sin permisos';
        response.redirect('/permisos/new');
        return;
    }
    DataPermisos.newRol(request.body.rolName, permisos, correo)
        .then(([rows, fieldData]) => {
            request.session.success = 'Rol creado correctamente';
            response.redirect('/permisos');
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Error al crear rol, verifica que el nombre no esté repetido';
            response.redirect('/permisos/new');
        });
}

exports.postDeleteRol = (request, response, next) =>{
    DataPermisos.deleteRol(request.body.IDRol)
    .then(() => {
        request.session.success = 'Rol eliminado correctamente';
        response.redirect('/permisos');
    })
    .catch((error) => {
        console.log(error)
        request.session.error = 'Error al borrar rol';
        response.redirect('/permisos');
    })
}

exports.postRenombrarRol = (request, response, next) =>{
    const nuevoNombre = request.body.rolNombre;
    if(nuevoNombre.length < 200){
        DataPermisos.getRolByName(nuevoNombre)
        .then(([rows, fieldData]) => {
            if(rows.length > 0){
                // Si el nombre del rol ya existe, establece un error en la sesión y redirige
                request.session.error = 'Error al renombrar rol, el nombre ya existe';
                response.redirect('/permisos');
            } else {
                // Si el nombre del rol no existe, procede a renombrarlo
                DataPermisos.renombrarRol(request.body.IDRol, nuevoNombre)
                .then(() => {
                    request.session.success = 'Rol renombrado correctamente';
                    response.redirect('/permisos');
                })
                .catch((error) => {
                    console.log(error)
                    request.session.error = 'Error al renombrar rol';
                    response.redirect('/permisos');
                })
            }
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Error al verificar el nombre del rol';
            response.redirect('/permisos');
        })
    } else {
        request.session.error = 'Error al renombrar rol, el nombre es demasiado largo';
        response.redirect('/permisos');
    }
}