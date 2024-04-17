

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

exports.post_new_brands = (request, response, next) => {
    const brandName = request.body.brandname;
    const brandImage = request.file.filename;  // Asumimos que 'request.file.filename' contiene el nombre del archivo de la imagen.

    // Verificamos que el nombre de la marca sea menor a 50 caracteres
    if (brandName.length > 50) {
        request.session.error = 'El nombre de la marca debe ser menor de 50 caracteres.';
        return response.redirect('/brands/new');  // Detiene la ejecución y redirige
    }

    // Verificamos que la imagen que el usuario ingresa sea un png o jpeg
    if (!validImageMimeTypes.includes(request.file.mimetype)) {
        request.session.error = 'Imagen inválida.';
        return response.redirect('/brands/new');  // Detiene la ejecución y redirige
    }

    // Buscamos si la marca ya existe
    Marca.findByName(brandName)
        .then(([rows]) => {
            if (rows.length > 0) {
                request.session.error = 'Esa marca ya existe.';
                return response.redirect('/brands/new'); 
            }

            // Si la marca no existe, creamos el objeto marca con los datos del request para agregar una nueva marca
            const marca = new Marca(brandName, brandImage);
            return marca.save();  // Guardamos la nueva marca
        })
        .then(([rows, fieldData]) => {
            response.redirect('/brands');  // Redirección final tras guardar la nueva marca
        })
        .catch((error) => {
            console.log(error);
            if (!response.headersSent) {
                request.session.error = 'Error al guardar la marca. Por favor, inténtalo de nuevo.';
                response.redirect('/brands');
            }
        });
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

    if (newbrandname.length > 50) {
        request.session.error = 'El nombre de la marca debe ser menor de 50 caracteres.';
        return response.redirect('/brands/editname');
    }

    Marca.findByName(brandname)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.error = 'La marca no existe.';
                return response.redirect('/brands/editname');
            }
            return Marca.findByName(newbrandname);
        })
        .then((results) => {
            const [rows] = results || [[]];  // Check added here to avoid destructuring undefined
            if (rows.length > 0 && rows[0].nombre !== brandname) {
                request.session.error = 'El nuevo nombre de la marca ya está en uso.';
                return response.redirect('/brands/editname');
            }
            return Marca.edit_name(brandname, newbrandname);
        })
        .then(([result]) => {
            if (result.affectedRows === 0) {
                throw new Error('No se pudo actualizar el nombre de la marca');
            }
            return response.redirect('/brands');
        })
        .catch((error) => {
            console.log(error);
            if (!response.headersSent) {
                request.session.error = 'Error al editar nombre de marca.';
                response.redirect('/brands');
            }
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