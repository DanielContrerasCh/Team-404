module.exports = (request, response, next) => {

    let canSee = false;
    for (let permiso of request.session.permisos) {
        if(permiso.Accion == 'Analiza') {
            canSee = true;
        }
    }

    if (canSee) {
        next();
        
    } else {
        return response.redirect('/user/logout');
    }
    
}