const express = require('express');
const app = express();

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

app.use(multer({ storage: fileStorage }).single('brandimagelink'));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');

app.use(function(req, res, next) {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(express.json())
const { defineRoutes } = require("./API/build/index");
defineRoutes(app);

app.use(session({
  secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

const path = require('path')

app.use(express.static(path.join(__dirname, '/public')));

const rutasLogin = require('./routes/login.routes');
app.use('/user', rutasLogin)

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

const rutasPermisos = require('./routes/permisos.routes');
app.use('/permisos', rutasPermisos)

const  rutaLandingPage = require('./routes/landingPage.routes')
app.use('/', rutaLandingPage);

app.use((request, response, next) =>{
  response.status(404);
  response.sendFile(path.join(__dirname, 'views', '404.html'));
});

// const app_1 = require("./API/build/app");
// let app_2;

// function main() {
//   return __awaiter(this, void 0, void 0, function* () {
//       app_2 = yield (0, app_1.startServer)();
//       app_2.use(express.json())
//       app_2.listen(process.env.PORT);
//       console.log("app listening on port " + process.env.PORT);
//       defineRoutes(app_2);
//   });
// }

// main();

app.listen(process.env.PORT);
console.log("app listening on port " + process.env.PORT);