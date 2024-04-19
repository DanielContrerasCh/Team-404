const { response } = require('express');
const Analiticas = require('../models/analiticas.model')

exports.getAnaliticas = (request, response, next) => {
    const error = request.session.error;
    request.session.error='';
            response.render('analiticas' , {
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            })
            //console.log(analytics);
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
            

        })
        .catch((error) => {
            console.log(error);
        });
}

exports.getSomeAnalyticsbyItemCodeAndYear = (request, response, next) => {
    const itemCode = request.body.itemCode;
    const year = request.body.year;

    Analiticas.fetchSomeAnalyticsByItemCodeAndYear(itemCode, year)
        .then(({ analytics }) => {
            response.render('filteredAnalyticsByItemCodeAndYear', {
                analytics: analytics,
                itemCode: itemCode,
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
            
        })
        .catch((error) => {
            console.log(error);
        }); 
    
}