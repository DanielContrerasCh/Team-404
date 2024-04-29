exports.getAyuda = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('ayuda',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
    });
}

exports.getAyudaCuenta = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('ayudaCuenta',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
    });
}

exports.getAyudaCatalogo = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('ayudaCatalogo',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
    });
}

exports.getAyudaResenas = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('ayudaResenas',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
    });
}

exports.getAyudaAnaliticas = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('ayudaAnaliticas',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
    });
}

exports.getAyudaMarcas = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('ayudaMarcas',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
    });
}

exports.getAyudaEncuestas = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('ayudaEncuestas',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
    });
}

exports.getAyudaPersonal = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('ayudaPersonal',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
    });
}

exports.getAyudaRoles = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('ayudaRoles',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
    });
}