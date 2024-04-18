const Usuario = require('../models/usuario.model');

exports.get_personal = (request, response, next) => {
    let totalRoles;
    Usuario.fetchRoles()
        .then(([roles, fieldData]) => {
            totalRoles = roles;
            return Usuario.fetchAll();
        })
        .then(([personal, fieldData]) => {
            for(let aux in personal){
                let fecha = new Date(personal[aux].fechaAsignacion);
                let opcionesDeFormato = { year: 'numeric', month: '2-digit', day: '2-digit' };
                let fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesDeFormato);
                personal[aux].fechaAsignacion = fechaFormateada;
            }
            const error = request.session.error || '';
            request.session.error = '';
            response.render('personal', {
                personal: personal,
                totalRoles: totalRoles,
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
                correo: request.session.correo || '',
                error: error,
            });
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
            request.session.error = 'Error al agregar empleado, verificar que no exista ya el correo';
            response.redirect('/personal');
        })
}

exports.post_delete_personal = (request, response, next) =>{
    Usuario.delete(request.body.correo)
        .then(([rows, fieldData]) => {
            response.redirect('/personal');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Error al borrar';
            response.redirect('/personal');
        })
}

exports.post_modify_personal = (request, response, next) =>{
    Usuario.modify(request.body.correo, request.body.rol)
        
        .then(([rows, fieldData]) => {
            response.redirect('/personal');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Error al cambiar';
            response.redirect('/personal');
        })
}

exports.get_buscar_personal = (request, response, next) => {

    Usuario.search(request.params.valor_busqueda || '')
        .then(([personal, fieldData]) => {
            for(aux in personal){
            let fecha = new Date(personal[aux].fechaAsignacion);
            // Formatear la fecha para mostrar solo la parte de la fecha
            let opcionesDeFormato = { year: 'numeric', month: '2-digit', day: '2-digit' };
            let fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesDeFormato);
            personal[aux].fechaAsignacion = fechaFormateada;
        }
            return response.status(200).json({personal:personal, correo:request.session.correo});
        })
        .catch((error) => {console.log(error)});
}

exports.getSomePersonal = (request, response, next) => {
    const rol = request.body.rol; // Get role from the request
    Usuario.filterPersonal(rol)
    .then(([personal, fieldData]) => {
        for(aux in personal){
            let fecha = new Date(personal[aux].fechaAsignacion);
            // Formatear la fecha para mostrar solo la parte de la fecha
            let opcionesDeFormato = { year: 'numeric', month: '2-digit', day: '2-digit' };
            let fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesDeFormato);
            personal[aux].fechaAsignacion = fechaFormateada;
        }
        const error = request.session.error || '';
        request.session.error = '';
        response.render('filteredPersonal', {
            personal: personal,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            correo: request.session.correo || '',
            error: error,
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

