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

exports.fetchSomeReviews = (request, response, next) => {
    
}

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

