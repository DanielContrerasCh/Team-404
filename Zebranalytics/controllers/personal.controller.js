const Usuario = require('../models/usuario.model');

exports.get_personal = (request, response, next) => {
    let totalRoles;
    Usuario.fetchRoles()
        .then(([roles, fieldData]) => {
            totalRoles = roles;
            return Usuario.fetchAll();
        })
        .then(([personal, fieldData]) => {

            const itemsPerPage = 8; // Número de marcas por página
            const totalPages = Math.ceil(personal.length / itemsPerPage); // Calcular el número total de páginas
            const page = parseInt(request.query.page) || 1; // Obtener el número de página desde la consulta, o usar la página 1 si no está definida

            // Calcular el índice de inicio y fin para las marcas en la página actual
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, personal.length);

            // Extraer las marcas de la página actual
            const paginatedPersonal = personal.slice(startIndex, endIndex);

            for(let aux in personal){
                let fecha = new Date(personal[aux].fechaAsignacion);
                let opcionesDeFormato = { year: 'numeric', month: '2-digit', day: '2-digit' };
                let fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesDeFormato);
                personal[aux].fechaAsignacion = fechaFormateada;
            }
            const error = request.session.error || '';
            request.session.error = '';
            const success = request.session.success || '';
            request.session.success = '';
            
            response.render('personal', {

                 // Para paginación
                totalPages: totalPages,
                currentPage: page,
                startIndex: startIndex,
                endIndex: endIndex,

                personal: paginatedPersonal,
                totalRoles: totalRoles,
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
                correo: request.session.correo || '',
                error: error,
                success: success,
            });
        })
        .catch(error => {
            console.log(error);
        });
}

exports.post_personal = (request, response, next) => {
    // Creamos objeto usuario con los datos del request para agregar un empleado
    const usuario = new Usuario(request.body.nombre, request.body.correoForm, request.body.password, request.body.rol);
    
    if (usuario.nombre.length > 100) {
        request.session.error = 'Error: Demasiados caracteres en el nombre';
        response.redirect('/personal');
        return;
    }
    
    if(usuario.correo.length > 100){
        request.session.error = 'Error: Demasiados caracteres en el correo';
        response.redirect('/personal');
        return;
    }
    
    usuario.save() // Llamamos el método save del modelo para guardar los datos
        .then(([rows, fieldData]) => {
            request.session.success = 'Empleado agregado correctamente';
            response.redirect('/personal');
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Error al agregar empleado';
            response.redirect('/personal');
        });
}

exports.post_delete_personal = (request, response, next) =>{
    Usuario.delete(request.body.correo)
        .then(([rows, fieldData]) => {
            request.session.success = 'Empleado eliminado correctamente';
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
            request.session.success = 'Empleado modificado correctamente';
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
            
            return response.status(200).json({ personal: personal, correo: request.session.correo });
        })
        .catch((error) => { console.log(error) });

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

