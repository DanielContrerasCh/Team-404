const { response } = require('express');
const Catalogo = require('../models/catalogo.model');

exports.getAllProducts = (request, response, next) => {
    Catalogo.fetchAllBrands()
    .then(([brands]) => {
    Catalogo.fetchAllProducts()
        .then(([rows, fieldData]) => {
            response.render('catalogo', {
                products: rows,
                brands: brands,
                pageTitle: 'Todos los productos',
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
            console.log(rows);
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.getProductByBrand = (request, response, next) => {
    const brand = request.body.brand;
    Catalogo.fetchProductByBrand(brand)
        .then(([rows, fieldData]) => {
            response.render('catalogo', {
                products: rows,
                pageTitle: 'Productos de la marca ' + brand,
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
            console.log(rows);
        })
        .catch(err => console.log(err));
}