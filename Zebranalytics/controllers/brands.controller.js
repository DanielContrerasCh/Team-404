exports.get_brands = (request, response, next) =>{
    response.render('brands',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_brands = (request, response, next) =>{
    response.render('brands',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.get_new_brands = (request, response, next) =>{
    response.render('new_brands',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.post_new_brands = (request, response, next) =>{
    response.render('new_brands',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}