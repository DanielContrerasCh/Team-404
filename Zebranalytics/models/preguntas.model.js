const db = require('../util/database');
const fs = require('fs');
const path = require('path');


module.exports = class Preguntas {
    constructor(NombreMarca, EstadoObligatorio, TipoPregunta, Pregunta, Categoria) {
        this.marca = NombreMarca;
        this.tipoPregunta = TipoPregunta;
        this.estado = EstadoObligatorio;
        this.pregunta = Pregunta;
        this.categoria = Categoria;
    }

    save(correo) {
         // Primero establecer el correo
         return db.execute('SET @creator_name = ?', [correo])
             .then(() => {
                 // Luego insertar la pregunta
                 return db.execute(
                    'INSERT INTO preguntas (NombreMarca, TipoPregunta, EstadoObligatorio, Pregunta, Categoria) VALUES (?, ?, ?, ?, ?)',
                     [this.marca, this.tipoPregunta, this.estado, this.pregunta, this.categoria]
                 );
            });
    }

    static fetchByMarcaAndCategoria(marca, categoria) {
        return db.execute('SELECT * FROM preguntas WHERE NombreMarca = ? AND Categoria = ?', [marca, categoria]);
    }
    
    static fetchAll() {
        return db.execute('SELECT * FROM preguntas');
    }

    static saveOptions(idPregunta, opciones) {
        const queries = opciones.map(opcion => 
            db.execute('INSERT INTO opciones_pregunta (IDPreguntas, TextoOpcion) VALUES (?, ?)', [idPregunta, opcion])
        );
        return Promise.all(queries);
    }
    
    static deleteByMarcaAndCategoria(marca, categoria) {
        return db.execute('SELECT IDPreguntas FROM preguntas WHERE NombreMarca = ? AND Categoria = ?', [marca, categoria])
        .then(([rows]) => {
            const deletePromises = rows.map(row =>
                db.execute('DELETE FROM opciones_pregunta WHERE IDPreguntas = ?', [row.IDPreguntas])
            );
            return Promise.all(deletePromises).then(() =>
                db.execute('DELETE FROM preguntas WHERE NombreMarca = ? AND Categoria = ?', [marca, categoria])
            );
        })
        .catch(error => {
            console.log(error);
            throw new Error('Error al eliminar la pregunta y sus opciones');
        });
    }

    static editPregunta(id, nuevaPregunta, obligatorio, tipoPregunta, correo) {
        return db.execute('SET @updating_user = ?', [correo])
            .then(() => {
                return db.execute(`
                    UPDATE preguntas 
                    SET Pregunta = ?, EstadoObligatorio = ?, TipoPregunta = ? 
                    WHERE IDPreguntas = ?`, [nuevaPregunta, obligatorio, tipoPregunta, id])
            })
            .then(result => {
                if (result[0].affectedRows === 0) {
                    throw new Error('Pregunta no encontrada');
                }
                return result;
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al actualizar la pregunta');
            });
    }
    
    static editPreguntaOpciones(idOpcion, textoOpcion) {
        return db.execute('UPDATE opciones_pregunta SET TextoOpcion = ? WHERE IDopcion = ?', [textoOpcion, idOpcion]);
    }
    

    static obtenerPreguntaPorId(id) {
        return db.execute('SELECT * FROM preguntas WHERE IDPreguntas = ?', [id])
            .then(result => {
                if (result[0].length === 0) {
                    return null; // Devuelve null si la pregunta no existe
                }
                return result[0][0]; // Devuelve la primera pregunta encontrada
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al obtener la pregunta por ID');
            });
    }

    // Método para obtener las categorias
    static fetchCategoriasPorMarca(nombreMarca) {
        return db.execute('SELECT categoria_nombre FROM categorias WHERE nombre_marca = ?', [nombreMarca]);
    }

    // Método nuevo para obtener encuestas por marca y categoría
    static async fetchEncuestasPorMarcaYCategoria(nombreMarca, nombreCategoria) {
        const query = `
            SELECT p.* FROM preguntas p
            JOIN categorias c ON p.NombreMarca = c.nombre_marca AND p.Categoria = c.categoria_nombre
            WHERE p.NombreMarca = ? AND c.categoria_nombre = ?
        `;
        try {
            const [rows] = await db.execute(query, [nombreMarca, nombreCategoria]);
            return rows;
        } catch (error) {
            console.log(error);
            throw new Error('Error al obtener encuestas por marca y categoría');
        }
    }

    static deleteOptions(idPregunta) {
        return db.execute('DELETE FROM opciones_pregunta WHERE IDPreguntas = ?', [idPregunta]);
    }

    static async deleteById(idPregunta, correo) {
        // Establecer el correo electrónico en una variable de sesión 
        await db.execute('SET @deleting_user = ?', [correo]);

        // Primero elimina las opciones relacionadas con la pregunta
        await db.execute('DELETE FROM opciones_pregunta WHERE IDPreguntas = ?', [idPregunta]);
    
        // Luego elimina la pregunta
        return db.execute('DELETE FROM preguntas WHERE IDPreguntas = ?', [idPregunta]);
    }

    static fetchOpcionesPorPregunta(idPregunta) {
        return db.execute('SELECT IDopcion, TextoOpcion FROM opciones_pregunta WHERE IDPreguntas = ?', [idPregunta]);
    }
    
    static updateTiempo(marca, categoria, tiempo) {
        return db.execute('UPDATE categorias SET TiempoEncuesta = ? WHERE nombre_marca = ? AND categoria_nombre = ?', [tiempo, marca, categoria]);
    }

    static obtenerTiempo(marca, categoria) {
        return db.execute('SELECT TiempoEncuesta FROM categorias WHERE nombre_marca = ? AND categoria_nombre = ?', [marca, categoria]);
    }

    static deleteOption(idOpcion) {
        return db.execute('DELETE FROM opciones_pregunta WHERE IDopcion = ?', [idOpcion]);
    }

    static fetchHistorialPorMarcaYCategoria(marca, categoria) {
        return db.execute(`
            SELECT PreguntaAnterior, PreguntaNueva, Correo 
            FROM bitacoraModificaPregunta AS b
            JOIN preguntas AS p ON b.IDpregunta = p.IDPreguntas
            WHERE p.NombreMarca = ? AND p.Categoria = ?
        `, [marca, categoria])
        .then(([results, fields]) => {
            return results;
        })
        .catch(err => {
            console.error('Error ejecutando la consulta de historial:', err);
            throw err;
        });
    }

    static updateHeader(nombreMarca, nombreCategoria, headerPath) {
        return db.execute(`
            UPDATE categorias
            SET header = ?
            WHERE nombre_marca = ? AND categoria_nombre = ?
        `, [headerPath, nombreMarca, nombreCategoria]);
    }
    
    static updateFooter(nombreMarca, nombreCategoria, footerPath) {
        return db.execute(`
            UPDATE categorias
            SET footer = ?
            WHERE nombre_marca = ? AND categoria_nombre = ?
        `, [footerPath, nombreMarca, nombreCategoria]);
    }

    static getHeaderImagePath(nombreMarca, nombreCategoria) {
        return db.execute('SELECT header FROM categorias WHERE nombre_marca = ? AND categoria_nombre = ?', [nombreMarca, nombreCategoria])
        .then(([rows]) => {
            if (rows.length === 0) {
                throw new Error('No se encontró la imagen de cabecera');
            }
            return rows[0].header; // Devuelve la ruta de la imagen de cabecera
        })
        .catch(error => {
            console.log(error);
            throw new Error('Error al obtener la imagen de cabecera');
        });
    }
    
    static getFooterImagePath(nombreMarca, nombreCategoria) {
        return db.execute('SELECT footer FROM categorias WHERE nombre_marca = ? AND categoria_nombre = ?', [nombreMarca, nombreCategoria])
        .then(([rows]) => {
            if (rows.length === 0) {
                throw new Error('No se encontró la imagen de pie de página');
            }
            return rows[0].footer; // Devuelve la ruta de la imagen de pie de página
        })
        .catch(error => {
            console.log(error);
            throw new Error('Error al obtener la imagen de pie de página');
        });
    }

    static deleteFile(filePath) {
        // Asegúrate de que 'filePath' comience con '/img/'
        // y que el archivo no sea una imagen predeterminada o necesaria.
        const fullPath = path.join(__dirname, '..', 'public', filePath);
    
        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error('Error al eliminar la imagen anterior:', fullPath, err);
            } else {
                console.log('Imagen anterior eliminada');
            }
        });
    }
}
