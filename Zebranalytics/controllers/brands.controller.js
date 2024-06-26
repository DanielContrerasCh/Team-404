

const Marca = require('../models/marca.model');

const validImageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

exports.getBrands = (request, response, next) =>{

    const error = request.session.error;
    request.session.error = '';
    const success = request.session.success;
    request.session.success = '';

    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
       
        //Para paginacion
        const itemsPerPage = 5; // Número de marcas por página
        const totalPages = Math.ceil(rows.length / itemsPerPage); // Calcular el número total de páginas
        const page = parseInt(request.query.page) || 1; // Obtener el número de página desde la consulta, o usar la página 1 si no está definida

        // Calcular el índice de inicio y fin para las marcas en la página actual
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, rows.length);

        // Extraer las marcas de la página actual
        const paginatedMarcas = rows.slice(startIndex, endIndex);

        // Renderiza la vista con las marcas paginadas y la información de paginación
        response.render('brands', {
            // Para paginación
            marcas: paginatedMarcas,
            totalPages: totalPages,
            currentPage: page,
            startIndex: startIndex,
            endIndex: endIndex,

            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
            error: error || '',
            success: success || '',

        })
    })
    .catch(error => {
        console.log(error);
    });
}

exports.postNewBrands = (request, response, next) => {
    
    // Verificamos que la imagen que el usuario ingresa sea un png o jpeg
    if (!validImageMimeTypes.includes(request.file.mimetype)) {
        request.session.error = 'Imagen inválida.';
        return response.redirect('/brands/new');  // Detiene la ejecución y redirige
    }

    // Verificamos que el nombre de la marca sea menor a 50 caracteres
    if (request.body.brandName.length > 50) {
        Marca.eliminaImagenNueva(request.file.filename).then((message) => {
            request.session.error = 'El nombre de la marca debe ser de máximo 50 caracteres.';
            return response.redirect('/brands/new');
        }).catch((error) => {
            console.log(error)
            request.session.error = 'Error al borrar imagen nueva';
            return response.redirect('/brands/new');
        })
        
    }

    //Creamos objeto usuario con los datos del request para agregar una marca
    else{
    const marca = new Marca(request.body.brandName, request.file.filename);
    marca.save() //Llamamos el método save del modelo para guardar los datos
        .then(([rows, fieldData]) => {
            request.session.success = 'Marca guardada correctamente.';
            response.redirect('/brands');
        })
        .catch((error) => {
            console.log(error);
            if (!response.headersSent) {
                request.session.error = 'Error al guardar la marca. Por favor, inténtalo de nuevo.';
                response.redirect('/brands');
            }
        })
    }
}


exports.getNewBrands = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    const success = request.session.success;
    request.session.success = '';
    
    response.render('newBrands',{
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
        success: success || '',
    });
}



exports.getDeleteBrands = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    const success = request.session.success;
    request.session.success = '';

    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('deleteBrands', {
        // asigna a marcas el valor de las rows
        marcas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
        success: success || '',
    });
})
.catch(error => {
    console.log(error);
});
}


exports.postDeleteBrands = (request, response, next) =>{

    if (request.body.brandName.length > 50) {
        request.session.error = 'El nombre de la marca debe ser menor de 50 caracteres.';
        return response.redirect('/brands/delete');
    }

    Marca.findByName(request.body.brandName)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.error = 'La marca no existe.';
                return response.redirect('/brands/delete');
            }
          
            Marca.delete(request.body.brandName)
                .then((message) => {
                    console.log(message);
                    request.session.success = 'Marca eliminada correctamente.';
                    response.redirect('/brands');
                })
                .catch((error) => {
                    console.log(error)
                    request.session.error = 'Error al borrar';
                    response.redirect('/brands');
                })
        })
        
}


exports.getEditBrandsName = (request, response, next) =>{
    const error = request.session.error;
    request.session.error = '';
    const success = request.session.success;
    request.session.success = '';

    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('editBrandsName', {
        // asigna a marcas el valor de las rows
        marcas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
        success: success || '',
        })
    })
    .catch(error => {
        console.log(error);
    });
}

exports.postEditBrandsName = (request, response, next) => {

    if (request.body.brandName.length > 50) {
        request.session.error = 'El nombre de la marca de entrada debe ser menor de 50 caracteres.';
        return response.redirect('/brands/editName');
    }

    else if (request.body.newBrandName.length > 50) {
        request.session.error = 'El nombre de la marca nueva debe ser menor de 50 caracteres.';
        return response.redirect('/brands/editName');
    }

    else{
    Marca.findByName(request.body.brandName)
        .then(([rows]) => {
            if (rows.length === 0) {
                request.session.error = 'La marca no existe.';
                return response.redirect('/brands/editName');
            }
            return Marca.findByName(request.body.newBrandName);
        })
        .then((results) => {
            const [rows] = results || [[]];  // Check added here to avoid destructuring undefined
            if (rows.length > 0 && rows[0].nombre !== brandName) {
                request.session.error = 'El nuevo nombre de la marca ya está en uso.';
                return response.redirect('/brands/editName');
            }
            return Marca.editName(request.body.brandName, request.body.newBrandName);
        })
        .then(([result]) => {
            if (result.affectedRows === 0) {
                throw new Error('No se pudo actualizar el nombre de la marca');
            }
            request.session.success = 'Nombre de marca editado correctamente.';
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
}





exports.getEditBrandsImage = (request, response, next) =>{
    const error = request.session.error || '';
    request.session.error = '';
    const success = request.session.success;
    request.session.success = '';

    Marca.fetchAll().then(([rows, fieldData]) => { //Cargamos todas las marcas en marcas
        // console.log(rows[1].fechaAsignacion);
        // Renderiza la view
        response.render('editBrandsImage', {
        // asigna a marcas el valor de las rows
        marcas: rows,
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
        error: error || '',
        success: success || '',
        })
    })
    .catch(error => {
        console.log(error);
    });
}

exports.postEditBrandsImage = (request, response, next) =>{

    if (request.body.brandName.length > 50) {

        Marca.eliminaImagenNueva(request.file.filename).then((message) => {
            request.session.error = 'El nombre de la marca debe ser menor de 50 caracteres.';
            return response.redirect('/brands/editImage');
        }).catch((error) => {
            console.log(error)
            request.session.error = 'Error al borrar imagen nueva';
            return response.redirect('/brands/editImage');
        })
        
    }

    else{

    Marca.editImage(request.body.brandName, request.file.filename)
        .then(([rows, fieldData]) => {
            request.session.success = 'Imagen de marca editada correctamente.';
            response.redirect('/brands');
        })
        .catch((error) => {
            console.log(error)
            request.session.error = 'Error al editar imagen de marca';
            return response.redirect('/brands/editImage');
        })

    }
}