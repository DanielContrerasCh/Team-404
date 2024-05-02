const db = require('../util/database');
const fs = require('fs');
const path = require('path');

module.exports = class Categorias {
    constructor(NombreMarca, EstadoObligatorio, TipoPregunta, Pregunta, Categoria) {
        this.marca = NombreMarca;
        this.tipoPregunta = TipoPregunta;
        this.estado = EstadoObligatorio;
        this.pregunta = Pregunta;
        this.categoria = Categoria;
    }

    // Método nuevo para verificar si una categoría ya existe
    static categoriaExiste(marca, categoria_nombre) {
        return db.execute('SELECT * FROM categorias WHERE nombre_marca = ? AND categoria_nombre = ?', [marca, categoria_nombre]);
    }

    // Método nuevo para agregar una nueva categoría
    static agregarCategoria(categoria_nombre, marca) {
        return db.execute('INSERT INTO categorias (categoria_nombre, nombre_marca) VALUES (?, ?)', [categoria_nombre, marca]);
    }

    // Método para renombrar una categoría basado en su nombre y marca
    static async renombrarCategoria(nombreMarca, nombreCategoriaActual, nuevoNombreCategoria) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction(); // Inicia una transacción
    
            // Verificar si el nuevo nombre de categoría ya existe
            const [rows] = await connection.execute(
                'SELECT categoria_nombre FROM categorias WHERE nombre_marca = ? AND categoria_nombre = ?',
                [nombreMarca, nuevoNombreCategoria]
            );
    
            if (rows.length > 0) {
                throw new Error('Categoría ya existe');
            }
    
            // Actualiza el nombre de la categoría en la tabla de categorías
            await connection.execute(
                'UPDATE categorias SET categoria_nombre = ? WHERE nombre_marca = ? AND categoria_nombre = ?',
                [nuevoNombreCategoria, nombreMarca, nombreCategoriaActual]
            );
    
            // Actualiza la categoría en la tabla de preguntas
            await connection.execute(
                'UPDATE preguntas SET Categoria = ? WHERE NombreMarca = ? AND Categoria = ?',
                [nuevoNombreCategoria, nombreMarca, nombreCategoriaActual]
            );
    
            // Actualiza la categoría en la tabla de productos
            await connection.execute(
                'UPDATE producto SET categoria_nombre = ? WHERE NombreMarca = ? AND categoria_nombre = ?',
                [nuevoNombreCategoria, nombreMarca, nombreCategoriaActual]
            );
    
            await connection.commit(); // Si todo va bien, confirma los cambios
        } catch (error) {
            await connection.rollback(); // Si hay un error, revierte los cambios
            console.log(error);
            throw error; // Propaga el error
        } finally {
            connection.release(); // Libera la conexión
        }
    }
    
    

    static async eliminarCategoriaPorNombre(nombreMarca, nombreCategoria) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction(); // Inicia una transacción
    
            // Obtener IDs de preguntas asociadas a la categoría y rutas de imágenes
            const [categorias] = await connection.execute(
                'SELECT IDPreguntas, header, footer FROM preguntas INNER JOIN categorias ON categorias.categoria_nombre = preguntas.Categoria AND categorias.nombre_marca = preguntas.NombreMarca WHERE categorias.nombre_marca = ? AND categorias.categoria_nombre = ?',
                [nombreMarca, nombreCategoria]
            );
    
            // Eliminar opciones de las preguntas encontradas
            for (const categoria of categorias) {
                await connection.execute(
                    'DELETE FROM opciones_pregunta WHERE IDPreguntas = ?',
                    [categoria.IDPreguntas]
                );
            }
    
            // Eliminar las preguntas asociadas a la categoría
            if (categorias.length > 0) {
                await connection.execute(
                    'DELETE FROM preguntas WHERE NombreMarca = ? AND Categoria = ?',
                    [nombreMarca, nombreCategoria]
                );
            }
    
            // Eliminar imágenes de header y footer si no son NULL 
            for (const categoria of categorias) {
                if (categoria.header) this.deleteFile(categoria.header);
                if (categoria.footer) this.deleteFile(categoria.footer);
            }
    
            // Finalmente, eliminar la categoría
            await connection.execute(
                'DELETE FROM categorias WHERE nombre_marca = ? AND categoria_nombre = ?',
                [nombreMarca, nombreCategoria]
            );
    
            await connection.commit(); // Confirma los cambios si todo va bien
        } catch (error) {
            await connection.rollback(); // Revierte los cambios en caso de error
            console.log(error);
            throw new Error('Error al eliminar la categoría y sus preguntas, opciones e imágenes asociadas');
        } finally {
            connection.release(); // Libera la conexión
        }
    }

    static deleteFile(filePath) {
        const fullPath = path.join(__dirname, '..', 'public', filePath);
    
        fs.unlink(fullPath, (err) => {
            if (err) {
                console.error('Error al eliminar la imagen anterior:', fullPath, err);
            } else {
                console.log('Imagen anterior eliminada');
            }
        });
    }

};