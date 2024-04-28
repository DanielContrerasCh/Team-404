const { response } = require('express');
const Analiticas = require('../models/analiticas.model')

exports.getAnaliticas = (request, response, next) => {
    const error = request.session.error;
    request.session.error = '';
    Promise.all([
        Analiticas.fetchAllReviews(),
        Analiticas.fetchAllBrands(),
        Analiticas.fetchAnswers(),
    ])
    .then(([reviews, brands, answers]) => {
        response.render('analiticas', {
            reviews: reviews[0],
            brands: brands[0],
            answers: answers[0],
            username: request.session.username || '',
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            error: error,
        });
    })
    .catch((error) => {
        console.log(error);
    });
}


exports.getSomeAnalytics = (request, response, next) => {
    const error = request.session.error;
    request.session.error = '';
    const brand = request.body.brand; // Obtener la marca de la petición
    const itemCode = request.body.itemCode; // Obtener el código de la petición
    const year = request.body.year; // Obtener el año de la petición
    const quarter = request.body.quarter; // Obtener el trimestre de la petición
    
    Analiticas.fetchAllBrands()
        .then(([brands]) => {
        
        if(quarter == 1){
            
            if (brand != "Todas las marcas" && year != ''){
                if (brand && year) {
                    Analiticas.fetchSomeAnalyticsByBrandYearAndQuarter(brand, year)
                        .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
                            response.render('filteredAnalytics', {
                                analytics: analytics,
                                itemCode: itemCode,
                                brand: brand,
                                year: year,
                                quarter: quarter,
                                username: request.session.username || '',
                                csrfToken: request.csrfToken(),
                                permisos: request.session.permisos || [],
                                brands: brands, // Agregar las marcas al objeto que se pasa a la vista
                            });
                            //console.log(analytics);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else if (itemCode && year) {
                    Analiticas.fetchSomeAnalyticsByItemCodeAndYear(itemCode, year)
                        .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
                            response.render('filteredAnalytics', {
                                analytics: analytics,
                                brand: brand,
                                year: year,
                                itemCode: itemCode,
                                quarter: quarter,
                                username: request.session.username || '',
                                csrfToken: request.csrfToken(),
                                permisos: request.session.permisos || [],
                                brands: brands, // Agregar las marcas al objeto que se pasa a la vista
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }} //Fin del if de todas las marcas y anio
            
        } else {
            if (brand != "Todas las marcas" && year != ''){
            if (brand && year) {
                Analiticas.fetchSomeAnalyticsByBrandAndYear(brand, year)
                    .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
                        response.render('filteredAnalytics', {
                            analytics: analytics,
                            itemCode: itemCode,
                            brand: brand,
                            year: year,
                            quarter: quarter,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                            brands: brands, // Agregar las marcas al objeto que se pasa a la vista
                            error: error,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else if (itemCode && year) {
                Analiticas.fetchSomeAnalyticsByItemCodeAndYear(itemCode, year)
                    .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
                        response.render('filteredAnalytics', {
                            analytics: analytics,
                            brand: brand,
                            year: year,
                            itemCode: itemCode,
                            quarter: quarter,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                            brands: brands, // Agregar las marcas al objeto que se pasa a la vista
                            error: error,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }} //Fin del if de todas las marcas y anio
            
            //Para todas las marcas, pero con anio
            else if (brand == "Todas las marcas" && year != '') {
                Analiticas.fetchSomeAnalyticsByOnlyYear(year)
                    .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
                        response.render('filteredAnalytics', {
                            analytics: analytics,
                            brand: brand,
                            year: year,
                            itemCode: itemCode,
                            quarter: quarter,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                            brands: brands, // Agregar las marcas al objeto que se pasa a la vista
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } 

            else if (itemCode && year == '') { //Para itemCode, sin anio
                Analiticas.fetchSomeAnalyticsByOnlyItemCode(itemCode)
                    .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
                        response.render('filteredAnalytics', {
                            analytics: analytics,
                            brand: brand,
                            year: year,
                            itemCode: itemCode,
                            quarter: quarter,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                            brands: brands, // Agregar las marcas al objeto que se pasa a la vista
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            else if (brand == "Todas las marcas" && year == '') { //Para todas las marcas, todos los anios
               
                Analiticas.fetchSomeAnalyticsByEveryBrandEveryYear()
                    
                    .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
                        response.render('filteredAnalytics', {
                            analytics: analytics,
                            brand: brand,
                            itemCode: itemCode,
                            quarter: quarter,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                            brands: brands, // Agregar las marcas al objeto que se pasa a la vista
                        });
                        //console.log(analytics);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            //Para marca especifica, sin anio
            else if (brand != "Todas las marcas" && year == '') { //Para todas las marcas, sin anio
                Analiticas.fetchSomeAnalyticsByOnlyBrand(brand)
                    .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
                        response.render('filteredAnalytics', {
                            analytics: analytics,
                            brand: brand,
                            itemCode: itemCode,
                            quarter: quarter,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                            brands: brands, // Agregar las marcas al objeto que se pasa a la vista
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            else {
                response.redirect('/analiticas');
            }
        }})
        .catch((error) => {
            console.log(error);
            response.redirect('/analiticas');
        });
};