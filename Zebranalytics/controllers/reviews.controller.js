const { response } = require('express');
const Review = require('../models/reviews.model');

exports.get_reviews = (request, response, next) => {
    Review.fetchAllReviews(request)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('reviews', {
                reviews: rows,
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.getSomeReviews = (request, response, next) => {
    const brand = request.body.brand; // Get brand from the request
    const quarter = request.body.quarter; // Get quarter from the request
    const year = request.body.year; // Get year from the request

    // If no quarter is selected, fetch all reviews for the year
    if (!quarter) {
        Review.fetchAllForYear(brand, year)
        .then(([rows, fieldData]) => {
            console.log(brand);
            response.render('filteredReviews', {
                reviews: rows,
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
    } else {
        // If a quarter is selected, fetch reviews for the quarter
        Review.fetchSome(brand, quarter, year)
        .then(([rows, fieldData]) => {
            console.log(brand);
            response.render('filteredReviews', {
                reviews: rows,
                username: request.session.username || '',
                csrfToken: request.csrfToken(),
                permisos: request.session.permisos || [],
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }
};


exports.post_reviews = (request, response, next) => {
    request.session.username = request.body.username;
    response.redirect('/');
};

exports.change_visibility = (request, response, next) => {
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

