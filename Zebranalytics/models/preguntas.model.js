const db = require('../util/database');

module.exports = class Preguntas {
    constructor(NombreMarca, EstadoObligatorio, TipoPregunta, Pregunta, Categoria) {
        this.marca = NombreMarca;
        this.tipoPregunta = TipoPregunta;
        this.estado = EstadoObligatorio;
        this.pregunta = Pregunta;
        this.categoria = Categoria;
    }

    save() {
        return db.execute(
            'INSERT INTO preguntas (NombreMarca, TipoPregunta, EstadoObligatorio, Pregunta, Categoria) VALUES (?, ?, ?, ?, ?)',
            [this.marca, this.tipoPregunta, this.estado, this.pregunta, this.categoria]
        );
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

    static edit_pregunta(id, nuevaPregunta, obligatorio, tipoPregunta) {
        return db.execute(`
            UPDATE preguntas 
            SET Pregunta = ?, EstadoObligatorio = ?, TipoPregunta = ? 
            WHERE IDPreguntas = ?`, [nuevaPregunta, obligatorio, tipoPregunta, id])
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
    
    static edit_pregunta_opciones(id, opciones) {
        return db.execute(`
            UPDATE opciones_pregunta 
            SET TextoOpcion = ?
            WHERE IDPreguntas = ?`, [opciones, id])
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

    static obtener_pregunta_por_id(id) {
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

    // Método nuevo para verificar si una categoría ya existe
    static categoriaExiste(marca, categoria_nombre) {
        return db.execute('SELECT * FROM categorias WHERE nombre_marca = ? AND categoria_nombre = ?', [marca, categoria_nombre]);
    }

    // Método nuevo para agregar una nueva categoría
    static agregarCategoria(categoria_nombre, marca) {
        return db.execute('INSERT INTO categorias (categoria_nombre, nombre_marca) VALUES (?, ?)', [categoria_nombre, marca]);
    }

    // Método para obtener las categorias
    static fetchCategoriasPorMarca(nombreMarca) {
        return db.execute('SELECT categoria_nombre FROM categorias WHERE nombre_marca = ?', [nombreMarca]);
    }

    // Método para renombrar una categoría basado en su nombre y marca
    static renombrarCategoria(nombreMarca, nombreCategoriaActual, nuevoNombreCategoria) {
        return db.execute(
            'UPDATE categorias SET categoria_nombre = ? WHERE nombre_marca = ? AND categoria_nombre = ?',
            [nuevoNombreCategoria, nombreMarca, nombreCategoriaActual]
        );
    }

    // Método para eliminar una categoría por su nombre y marca
    static eliminarCategoriaPorNombre(nombreMarca, nombreCategoria) {
        return db.execute(
            'DELETE FROM categorias WHERE nombre_marca = ? AND categoria_nombre = ?',
            [nombreMarca, nombreCategoria]
        );
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


}
