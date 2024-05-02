module.exports = (request, response, next) => {
    if (!request.session.isLoggedIn) {
        return response.redirect('/'); //Checamos que el usuario este loggeado a la pagina
    }
    next();
}