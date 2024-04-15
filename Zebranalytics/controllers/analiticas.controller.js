const { response } = require('express');
const Analiticas = require('../models/analiticas.model')

exports.get_analiticas = (request, response, next) => {
    const brand = 'NombreMarca'; // Reemplaza 'NombreMarca' con la marca que quieras
    Analiticas.fetchLuunaAnalytics()
        .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
            response.render('analiticas' , {
                analytics: analytics, 
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            })
            //console.log(analytics);
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