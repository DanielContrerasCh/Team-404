const express = require('express');
const app = express();
const passport = require('passport');
const helmet = require("helmet")
require('./passport-setup');

const favicon = require('serve-favicon');

app.use(helmet());

// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "default-src": ["'self'"],
//       "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'apis.google.com', 'maxcdn.bootstrapcdn.com', 'kit.fontawesome.com'],
//       "style-src": ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'maxcdn.bootstrapcdn.com', 'logInStyle.css'],
//       "font-src": ["'self'", 'external-website.com', 'fonts.gstatic.com'],
//       "img-src": ["'self'", 'data:', 'cdn.jsdelivr.net', 'maxcdn.bootstrapcdn.com'],
//       "connect-src": ["'self'"],
//       "frame-src": ["'self'", 'accounts.google.com']
//     },
//   })
// );

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'apis.google.com', 'maxcdn.bootstrapcdn.com', 'kit.fontawesome.com'],
//         "style-src": ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'maxcdn.bootstrapcdn.com', 'logInStyle.css'],
//       },
//     },
//   })
// );
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);


const bodyParser = require('body-parser');
app.use(bodyParser.json());
//const db = require('./util/database');

app.use(bodyParser.urlencoded({extended: false}));

const multer = require('multer');
//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
  destination: (request, file, callback) => {
      //'public/uploads': Es el directorio del servidor donde se subirán los archivos 
      callback(null, 'public/img');
  },
  filename: (request, file, callback) => {
      //aquí configuramos el nombre que queremos que tenga el archivo en el servidor, 
      //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
      callback(null, Number(new Date()).toString() + '-' + file.originalname);
  },
});

app.use(multer({ storage: fileStorage }).single('brandImageLink'));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');

app.use(function(req, res, next) {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("Origin-Agent-Cluster", "require");
  next();
});


const rutasZecore = require('./routes/zecore.routes');
app.use('/zecore', rutasZecore)

const rutasSubmissions = require('./routes/submissions.routes');
app.use('/mail', rutasSubmissions)

app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

const path = require('path')

app.use(express.static(path.join(__dirname, '/public')));

app.use(favicon(path.join(__dirname,'public','img','favicon.png')))

app.use(passport.initialize());
app.use(passport.session());

const rutasAnaliticas = require('./routes/analiticas.routes');
app.use('/analiticas',rutasAnaliticas)

const rutasCuenta = require('./routes/cuenta.routes');
app.use('/cuenta', rutasCuenta)

const rutasBrands = require('./routes/brands.routes');
app.use('/brands', rutasBrands)

const rutasReviews = require('./routes/reviews.routes');
app.use('/reviews', rutasReviews)

const rutasEncuestas = require('./routes/encuestas.routes');
app.use('/encuestas', rutasEncuestas)

const rutasPersonal = require('./routes/personal.routes');
app.use('/personal', rutasPersonal)


const catalogoRoutes = require('./routes/catalogo.routes');
app.use('/catalogo', catalogoRoutes);

const rutasPermisos = require('./routes/permisos.routes');
app.use('/permisos', rutasPermisos)

const rutasAyuda = require('./routes/ayuda.routes');
app.use('/ayuda', rutasAyuda)

const rutasHistorial = require('./routes/historial.routes');
app.use('/historial', rutasHistorial)

const rutaLogin = require('./routes/login.routes')
app.use('/', rutaLogin);

app.use((request, response, next) =>{
  response.status(404);
  response.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(process.env.PORT);
console.log("app listening on port " + process.env.PORT);