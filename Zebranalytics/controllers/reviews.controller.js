const { response } = require('express');
const Review = require('../models/reviews.model');

exports.getReviews = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    // Fetch all unique brands
    Review.fetchAllBrands()
    .then(([brands]) => {
        // Fetch all reviews
        Review.fetchAllReviews(request)
        .then(([rows, fieldData]) => {
            response.render('reviews', {
                reviews: rows,
                brands: brands,
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
                error: error,
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
exports.getSomeReviews = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    const brand = request.body.brand; // Get brand from the request
    const quarter = request.body.quarter; // Get quarter from the request
    const year = request.body.year; // Get year from the request

    // Fetch all unique brands
    Review.fetchAllBrands()
    .then(([brands]) => {
        // If no quarter is selected, fetch all reviews for the year
        if (!quarter) {
            Review.fetchAllForYear(brand, year)
            .then(([rows, fieldData]) => {
                response.render('filteredReviews', {
                    reviews: rows,
                    brands: brands,
                    username: request.session.username || '',
                    csrfToken: request.csrfToken(),
                    permisos: request.session.permisos || [],
                    error: error,
                });
                
            })
            .catch((error) => {
                console.log(error);
            });
        } else {
            // If a quarter is selected, fetch reviews for the quarter
            Review.fetchSome(brand, quarter, year)
            .then(([rows, fieldData]) => {
                response.render('filteredReviews', {
                    reviews: rows,
                    brands: brands,
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
    })
    .catch((error) => {
        console.log(error);
    });
};


exports.changeVisibility = (request, response, next) => {
    const { IdResena } = request.params;
    
    Review.changeVisibility(IdResena)
    
        .then(([result]) => {
            const newCsrfToken = request.csrfToken();
            response.status(200).json({ message: 'Visibility changed successfully', result, csrfToken: newCsrfToken });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: 'Internal server error' });
        });
};

