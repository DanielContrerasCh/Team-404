exports.get_reviews = (request, response, next) =>{
    response.render('reviews', {
        username: request.session.username || '',
    });
}

exports.post_reviews = (request, response, next) =>{
    request.session.username = request.body.username;
    response.redirect('/')
}