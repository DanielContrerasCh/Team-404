

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
    // Verificamos que el nombre de la marca sea menor a 50 caracteres
    if (request.body.brandname.length > 50) {
        request.session.error = 'El nombre de la marca debe ser menor de 50 caracteres.';
        return response.redirect('/brands/new');
    }
    

    // Verificamos que la imagen que el usuario ingresa sea un png o jpeg
    if (!validImageMimeTypes.includes(request.file.mimetype)) {
        request.session.error = 'Imagen invalida.';
        return response.redirect('/brands/new');
    }

    // Creamos objeto marca con los datos del request para agregar una nueva marca
    const marca = new Marca(request.body.brandname, request.file.filename);
    marca.save() // Llamamos el método save del modelo para guardar los datos
        .then(([rows, fieldData]) => {
            response.redirect('/brands');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Error al guardar la marca. Por favor, inténtalo de nuevo.';
            response.redirect('/brands');
        })
}




exports.get_new_brands = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    
    response.render('new_brands',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error
    });
}



exports.get_delete_brands = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';

    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('delete_brands', {
        // asigna a marcas el valor de las rows
        marcas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error,
    });
})
.catch(error => {
    console.log(error);
});
}


exports.post_delete_brands = (request, response, next) =>{
    const brandname = request.body.brandname;

    Marca.findByName(brandname)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.error = 'La marca no existe.';
                return response.redirect('/brands/delete');
            }
            //Creamos objeto usuario con los datos del request para agregar una marca
            Marca.delete(request.body.brandname) //Llamamos el método save del modelo para guardar los datos
                .then((message) => {
                    console.log(message);
                    response.redirect('/brands');
                })
                .catch((error) => {
                    console.log(error)
                    request.session.error = 'Error al borrar';
                    response.redirect('/brands');
                })
        })
}


exports.get_edit_brands_name = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';

    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('edit_brands_name', {
        // asigna a marcas el valor de las rows
        marcas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error
        })
    })
    .catch(error => {
        console.log(error);
    });
}

exports.post_edit_brands_name = (request, response, next) => {
    const brandname = request.body.brandname;
    const newbrandname = request.body.newbrandname;

    // Verificamos que el nuevo nombre de la marca sea menor a 50 caracteres
    if (newbrandname.length > 50) {
        request.session.error = 'El nombre de la marca debe ser menor de 50 caracteres.';
        return response.redirect('/brands/editname');
    }

    // Primero verificamos que la marca exista
    Marca.findByName(brandname)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.error = 'La marca no existe.';
                return response.redirect('/brands/editname');
            }

            // Si la marca existe, procedemos a editar el nombre
            Marca.edit_name(brandname, newbrandname)
                .then(([rows, fieldData]) => {
                    response.redirect('/brands');
                })
                .catch((error) => {
                    console.log(error);
                    request.session.error = 'Error al editar nombre de marca.';
                    response.redirect('/brands');
                });
        })
        .catch((error) => {
            console.log(error);
            request.session.error = 'Error al buscar la marca.';
            response.redirect('/brands');
        });
}



exports.get_edit_brands_image = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';

    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('edit_brands_image', {
        // asigna a marcas el valor de las rows
        marcas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error,
        })
    })
    .catch(error => {
        console.log(error);
    });
}

exports.post_edit_brands_image = (request, response, next) =>{
    const brandname = request.body.brandname;

    Marca.findByName(brandname)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.error = 'La marca no existe.';
                return response.redirect('/brands/editimage');
            }
    
            Marca.edit_image(request.body.brandname, request.file.filename)

                .then(([rows, fieldData]) => {
                    response.redirect('/brands');
                })
                .catch((error) => {
                    console.log(error)
                    request.session.error = 'Error al editar imagen de marca';
                    response.redirect('/brands');
                })
        })
}