const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const db = require('./util/database');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');

app.use(session({
  secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

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

app.use((request, response, next) =>{
  response.status(404);
  response.sendFile(path.join(__dirname, 'views', '404.html'));
});


app.listen(3000);