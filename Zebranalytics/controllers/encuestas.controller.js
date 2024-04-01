const Preguntas = require('../models/preguntas.model')
const bcrypt = require('bcryptjs');

// LUUNA 
exports.get_luuna = (request, response, next) =>{
    console.log('Ruta /luuna');
    response.render('encuesta_luuna', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    })
}

exports.get_luuna_new_colchones = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Colchones');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_colchones', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_luuna_new_colchones = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Colchones');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_almohadas = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Almohadas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_almohadas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_luuna_new_almohadas = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Almohadas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_muebles = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Muebles');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_muebles', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }

}

exports.post_luuna_new_muebles = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Muebles');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_blancos = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Blancos');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_blancos', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_luuna_new_blancos = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Blancos');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_luuna_new_ninos = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('LUUNA', 'Ninos');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('luuna_ninos', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_luuna_new_ninos = (request, response, next) => {
    const preguntas = new Preguntas('LUUNA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Ninos');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/luuna');
        })
        .catch((error) => {
            console.log(error);
        });
}

// Mappa
exports.get_mappa = (request, response, next) =>{
    console.log('Ruta /mappa');
    response.render('encuesta_mappa', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    })
}

exports.get_mappa_new_maletas = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('MAPPA', 'Maletas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('mappa_maletas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_mappa_new_maletas = (request, response, next) => {
    const preguntas = new Preguntas('MAPPA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Maletas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/mappa');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_mappa_new_mochilas = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('MAPPA', 'Mochilas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('mappa_mochilas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_mappa_new_mochilas = (request, response, next) => {
    const preguntas = new Preguntas('MAPPA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Mochilas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/mappa');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_mappa_new_accesorios = async (request, response, next) =>{
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('MAPPA', 'Accesorios');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('mappa_accesorios', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_mappa_new_accesorios = (request, response, next) => {
    const preguntas = new Preguntas('MAPPA', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Accesorios');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/mappa');
        })
        .catch((error) => {
            console.log(error);
        });
}

// Nooz 
exports.get_nooz = (request, response, next) =>{
    console.log('Ruta /nooz');
    response.render('encuesta_nooz', {
        username: request.session.username || '',
        csrfToken: request.csrfToken(),
        permisos: request.session.permisos || [],
    })
}

exports.get_nooz_new_colchones = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Colchones');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_colchones', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_colchones = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Colchones');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_nooz_new_almohadas = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Almohadas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_almohadas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_almohadas = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Almohadas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_nooz_new_camas = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Camas');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_camas', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_camas = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Camas');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_nooz_new_blancos = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Blancos');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_blancos', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_blancos = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Blancos');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz');
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.get_nooz_new_accesorios = async (request, response, next) => {
    try {
        const [preguntas, _] = await Preguntas.fetchByMarcaAndCategoria('NOOZ', 'Accesorios');
        const ultimoId = preguntas.length > 0 ? preguntas[preguntas.length - 1].IDPreguntas : 0;
        
        response.render('nooz_accesorios', {
            preguntas: preguntas,
            ultimoId: ultimoId,
            csrfToken: request.csrfToken(),
            permisos: request.session.permisos || [],
        });
    } catch (error) {
        console.log(error);
        response.status(500).send('Error interno del servidor');
    }
}

exports.post_nooz_new_accesorios = (request, response, next) => {
    const preguntas = new Preguntas('NOOZ', request.body.EstadoObligatorio, request.body.TipoPregunta, request.body.Pregunta, 'Accesorios');
    preguntas.save()
        .then(([rows, fieldData]) => {
            response.redirect('/encuestas/nooz');
        })
        .catch((error) => {
            console.log(error);
        });
}