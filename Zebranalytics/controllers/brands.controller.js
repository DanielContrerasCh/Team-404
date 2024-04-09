

const Marca = require('../models/marca.model');

const validImageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png']

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
    // Verificamos que la imagen que el usuario ingresa sea un png o jpeg
    if (!validImageMimeTypes.includes(request.file.mimetype)) {
        response.redirect('/brands');
        response.status(409).send("imagen invalida")
      }
    //Creamos objeto usuario con los datos del request para agregar una marca
    const marca = new Marca(request.body.brandname, request.file.filename);
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



exports.get_delete_brands = (request, response, next) =>{
    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('delete_brands', {
        // asigna a marcas el valor de las rows
        marcas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    });
})
.catch(error => {
    console.log(error);
});
}

// exports.post_new_brands = (request, response, next) =>{
//     response.render('new_brands',{
//         csrfToken: request.csrfToken(),
//         permisos: request.session.permisos || [],
//     });
// }

exports.post_delete_brands = (request, response, next) =>{
    //Creamos objeto usuario con los datos del request para agregar una marca
    Marca.delete(request.body.brandname) //Llamamos el método save del modelo para guardar los datos
        .then(([rows, fieldData]) => {
            response.redirect('/brands');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Error al borrar';
            response.redirect('/brands');
        })
}


exports.get_edit_brands_name = (request, response, next) =>{
    

    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('edit_brands_name', {
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

exports.post_edit_brands_name = (request, response, next) =>{
    //Creamos objeto usuario con los datos del request para agregar una marca
    Marca.edit_name(request.body.brandname, request.body.newbrandname) //Llamamos el método save del modelo para guardar los datos

        .then(([rows, fieldData]) => {
            response.redirect('/brands');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Error al editar nombre de marca';
            response.redirect('/brands');
        })
}


exports.get_edit_brands_image = (request, response, next) =>{

    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('edit_brands_image', {
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

exports.post_edit_brands_image = (request, response, next) =>{
    //Creamos objeto usuario con los datos del request para agregar una marca
    
    // Marca.edit_image(request.body.brandname, request.body.newbrandimagelink) //Llamamos el método save del modelo para guardar los datos
    // cambia el nombre de newbrandimagelink
    Marca.edit_image(request.body.brandname, request.file.filename)

        .then(([rows, fieldData]) => {
            response.redirect('/brands');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Error al editar imagen de marca';
            response.redirect('/brands');
        })
}