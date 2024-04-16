const { response } = require('express');
const Catalogo = require('../models/catalogo.model');

exports.getAllProducts = (request, response, next) => {
    Catalogo.fetchAllProducts()
        .then(([rows, fieldData]) => {
            response.render('catalogo', {
                products: rows,
                pageTitle: 'Todos los productos',
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
            console.log(rows);
        })
        .catch(err => console.log(err));
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