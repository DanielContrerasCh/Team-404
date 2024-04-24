const { response } = require('express');
const Analiticas = require('../models/analiticas.model')

exports.getAnaliticas = (request, response, next) => {
    Analiticas.fetchAllReviews()
        .then(([reviews]) => {
            Analiticas.fetchAllBrands()
                .then(([brands]) => {
                    response.render('analiticas', {
                        reviews: reviews,
                        brands: brands,
                        username: request.session.username || '',
                        csrfToken: request.csrfToken(),
                        permisos: request.session.permisos || [],
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
}


exports.getSomeAnalytics = (request, response, next) => {
    const brand = request.body.brand; // Obtener la marca de la petición
    const itemCode = request.body.itemCode; // Obtener el código de la petición
    const year = request.body.year; // Obtener el año de la petición

    Analiticas.fetchAllBrands()
        .then(([brands]) => {
            if (brand && year) {
                Analiticas.fetchSomeAnalyticsByBrandAndYear(brand, year)
                    .then(({ analytics }) => { // Acceder a la propiedad 'analytics'
                        response.render('filteredAnalytics', {
                            analytics: analytics,
                            itemCode: itemCode,
                            brand: brand,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                            brands: brands, // Agregar las marcas al objeto que se pasa a la vista
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
                            itemCode: itemCode,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                            brands: brands, // Agregar las marcas al objeto que se pasa a la vista
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                response.redirect('/analiticas');
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

