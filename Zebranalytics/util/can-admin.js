module.exports = (request, response, next) => {

    let canUpdateRole = false;
    for (let permiso of request.session.permisos) {
        if(permiso.Accion == 'Administra') {
            canUpdateRole = true;
        }
    }

    if (canUpdateRole) {
        next();
        
    } else {
        return response.redirect('/user/logout');
    }
    
}