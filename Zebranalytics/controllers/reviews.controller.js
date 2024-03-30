const Review = require('../models/reviews.model');

exports.get_reviews = (request, response, next) =>{
    Review.fetchAllReviews(request).then(([rows, fieldData]) => {
        console.log(rows);
        response.render('reviews', {
            reviews: rows, 
            username: request.session.username || '',
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        })
    })
    .catch((error) => {
        console.log(error);
    });
}

exports.post_reviews = (request, response, next) =>{
    request.session.username = request.body.username;
    response.redirect('/');
}


exports.get_root = (request, response, next) => {
    Review.fetchAllReviews(request).then(([rows, fieldData]) => {
        console.log(rows);
        response.render('reviews', {
            reviews: rows, 
            username: request.session.username || '',
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        })
    })
    .catch((error) => {
        console.log(error);
    });
}
