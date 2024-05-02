module.exports = (request, response, next) => {

    let canSee = false;
    for (let permiso of request.session.permisos) {
        if(permiso.Accion == 'verAnaliticas') { //Checamos que los permisos del rol coincidan con los de Analista
            canSee = true;
        }
    }

    if (canSee) {
        next();
        
    } else {
        return response.redirect('/logout');
    }
    
}