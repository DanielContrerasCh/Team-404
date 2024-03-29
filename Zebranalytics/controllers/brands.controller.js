

const Marca = require('../models/marca.model');
const bcrypt = require('bcryptjs');

exports.get_brands = (request, response, next) =>{
    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('brands', {
        // asigna a marcas el valor de las rows
        marcas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        })
    })
    .catch(error => {
        console.log(error);
    });
}

exports.post_new_brands = (request, response, next) =>{
    //Creamos objeto usuario con los datos del request para agregar una marca
    const marca = new Marca(request.body.brandname, request.body.brandimagelink);
    marca.save() //Llamamos el método save del modelo para guardar los datos
        .then(([rows, fieldData]) => {
            response.redirect('/brands');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Nombre de Marca';
            response.redirect('/brands');
        })
}




// exports.get_brands = (request, response, next) =>{
//     response.render('brands',{
//         csrfToken: request.csrfToken(),
//         permisos: request.session.permisos || [],
//     });
// }

exports.post_brands = (request, response, next) =>{
    response.render('brands',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

exports.get_new_brands = (request, response, next) =>{
    
    response.render('new_brands',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
}

// exports.post_new_brands = (request, response, next) =>{
//     response.render('new_brands',{
//         csrfToken: request.csrfToken(),
//         permisos: request.session.permisos || [],
//     });
// }