module.exports = (request, response, next) => {

    let canUpdateRole = false;
    for (let permiso of request.session.permisos) {
        if(permiso.Accion == 'modificarUsuario') { //Checamos que los permisos del rol coincidan con los de Admin
            canUpdateRole = true;
        }
    }

    if (canUpdateRole) {
        next();
        
    } else {
        return response.redirect('/logout');
    }
    
}