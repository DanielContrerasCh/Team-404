module.exports = (request, response, next) => {

    let canUpdateReviews = false;
    for (let permiso of request.session.permisos) {
        if(permiso.funcion == 'reviews') {
            canUpdateReviews = true;
        }
    }

    if (canUpdateReviews) {
        next();
        
    } else {
        return response.redirect('/user/logout');
    }
    
}