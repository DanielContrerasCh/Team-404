const { response } = require('express');
const Analiticas = require('../models/analiticas.model')

exports.getAnaliticas = (request, response, next) => {
    Analiticas.fetchAnalytics()
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

exports.getSomeAnalyticsbyBrandAndYear = (request, response, next) => {
    const brand = request.body.brand; // Obtener la marca de la petición
    const year = request.body.year; // Obtener el año de la petición
    Analiticas.fetchSomeAnalyticsByBrandAndYear(brand, year)
        .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
            response.render('filteredAnalyticsByBrandAndYear', {
                analytics: analytics,
                brand: brand,
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
            //console.log(analytics);

        })
        .catch((error) => {
            console.log(error);
        });
}

exports.getSomeAnalyticsbyItemCode = (request, response, next) => {
    const itemCode = request.body.itemCode;
    console.log('itemCode:', itemCode); // Agregar esta línea

    Analiticas.fetchSomeAnalyticsByItemCode(itemCode)
        .then(({ analytics }) => {
            response.render('filteredAnalyticsByItemCode', {
                analytics: analytics,
                itemCode: itemCode,
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
            console.log(analytics);
        })
        .catch((error) => {
            console.log(error);
        }); 
    
}