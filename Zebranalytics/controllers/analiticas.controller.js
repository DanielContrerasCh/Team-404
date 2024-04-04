const { response } = require('express');
const Analiticas = require('../models/analisis.model')

exports.get_analiticas = (request, response, next) =>{
    Analiticas.fetchAllAnalytics(request)
        .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
            console.log(analytics);
            response.render('analiticas' , {
                analitics: analytics, 
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

exports.post_analiticas = (request, response, next) =>{
    response.render('analiticas', {
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}