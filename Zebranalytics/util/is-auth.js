module.exports = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        return response.redirect('/user/login'); //Checamos que el usuario este loggeado a la pagina
    }
    next();
}