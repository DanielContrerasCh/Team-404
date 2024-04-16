const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('./models/usuario.model');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;  // Email proporcionado por Google

    userModel.findUserByMail(email)
      .then(user => {
        if (user) {
          return done(null, user);  // Usuario encontrado, continuar autenticación
        } else {
          return done(null, false, { message: 'Este correo no está registrado' });  // Usuario no registrado
        }
      })
      .catch(error => {
        return done(error);  // Manejo de errores
      });
  }
));

passport.serializeUser((user, done) => {
    return done(null, user.CorreoEmpleado);  // Asegúrate de que 'id' es la columna correcta en tu base de datos
});

passport.deserializeUser((correoEmpleado, done) => {
    userModel.findUserByMail(correoEmpleado)
        .then(user => {
            if (user) {
                return done(null, user);  // Usuario encontrado
            } else {
                return done(null, false);  // Usuario no encontrado
            }
        })
        .catch(error => {
            return done(error, null);  // Error en la búsqueda
        });
});