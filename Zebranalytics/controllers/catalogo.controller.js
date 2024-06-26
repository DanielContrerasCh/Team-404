const { response } = require('express');
const Catalogo = require('../models/catalogo.model');

exports.getAllProducts = (request, response, next) => {
    const error = request.session.error;
    request.session.error = '';
    Catalogo.fetchAllBrands()
    .then(([brands]) => {
    Catalogo.fetchAllProducts()
        .then(([rows, fieldData]) => {
            const itemsPerPage = 8;
            const totalPages = Math.ceil(rows.length / itemsPerPage);
            const page = parseInt(request.query.page) || 1;

            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = Math.min(page * itemsPerPage, rows.length);
            
            const paginatedProducts = rows.slice(startIndex, endIndex);

            response.render('catalogo', {
                products: paginatedProducts,
                totalPages: totalPages,
                currentPage: page,
                startIndex: startIndex,
                endIndex: endIndex,

                brands: brands,
                pageTitle: 'Todos los productos',
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
                error: error || '',
                
            });
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
    const error = request.session.error;
    request.session.error = '';
    const brand = request.body.brand;
    Catalogo.fetchAllBrands()
    .then(([brands]) => {
        Catalogo.fetchProductByBrand(brand)
            .then(([rows, fieldData]) => {
                const itemsPerPage = 8;
                const totalPages = Math.ceil(rows.length / itemsPerPage);
                const page = parseInt(request.query.page) || 1;

                const startIndex = (page - 1) * itemsPerPage;
                const endIndex = Math.min(page * itemsPerPage, rows.length);
                
                const paginatedProducts = rows.slice(startIndex, endIndex);
                response.render('catalogo', {
                    products: paginatedProducts,
                    totalPages: totalPages,
                    currentPage: page,
                    startIndex: startIndex,
                    endIndex: endIndex,

                    products: rows,
                    brands: brands,
                    pageTitle: 'Productos de la marca ' + brand,
                    username: request.session.username || '',
                    csrfToken: request.csrfToken(),
                    permisos: request.session.permisos || [],
                    error: error || '',
                });
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}
exports.getBuscar = (request, response, next) => {
    const searchValue = request.params.valorBusqueda || '';
    Catalogo.fetchProductByItemCodeOrBrand(searchValue, searchValue)
        .then(([rows, fieldData]) => {
            return response.status(200).json({
                products: rows,
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
        })
        .catch((error) => {console.log(error);});
}