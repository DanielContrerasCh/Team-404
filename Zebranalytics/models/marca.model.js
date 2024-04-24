const db = require('../util/database');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const mysql = require('mysql2');


const marcas = {
    "Luuna": 1,
    "Mappa": 2,
    "Nooz": 3,
};

module.exports = class Marca {

    constructor(marca_nombre, marca_imagen){
        // this.id = marca_id;
        this.nombre = marca_nombre;
        this.imagen = marca_imagen;
        // this.categoria = categoria;
    }
    
    save() {

        return db.execute("INSERT INTO imagenmarca VALUES (?, ?)", 
            [this.nombre, this.imagen]
            
            // [this.nombre, this.imagen]
            )
        .catch((error => {

            const rutaImagen = this.imagen;
            console.log(rutaImagen);
    
            // Construir la ruta completa del archivo
            const rutaCompleta = path.join('public/img/', rutaImagen);
    
            console.log(rutaCompleta)
            // Verificar si el archivo existe antes de intentar eliminarlo
            if (fs.existsSync(rutaCompleta)) {
                // Intentar eliminar el archivo
                try {
                    // Eliminar el archivo
                    fs.unlinkSync(rutaCompleta);
                    console.log('El archivo fue eliminado correctamente.');
                } catch (error) {
                    console.error('Error al eliminar el archivo borrar manualmente:', error);
                }
            } else {
                console.log('El archivo de la imagen no existe en el sistema de archivos.');
            }
            console.log(error)
            throw Error('Error al guardar');
        }));
    }


    static async constructImagePath(nombre) {
        // console.log("Nombre de la marca recibido:", nombre);
        try {
            const [rows, fields] = await db.execute(`SELECT imagen FROM imagenmarca WHERE nombre = ?`, [nombre]);
            // console.log("Resultado de la consulta SQL:", rows);
            if (rows.length === 0) {
                console.log('La marca no tiene una imagen asociada.');
                return new Error('Error al eliminar marca'); // No hay necesidad de continuar si no hay imagen asociada
            }
            const rutaImagen = rows[0].imagen;
            console.log(rutaImagen);
    
            // Construir la ruta completa del archivo
            const rutaCompleta = path.join('public/img/', rutaImagen);
    
            console.log(rutaCompleta)
            // Verificar si el archivo existe antes de intentar eliminarlo
            if (fs.existsSync(rutaCompleta)) {
                // Intentar eliminar el archivo
                try {
                    // Eliminar el archivo
                    fs.unlinkSync(rutaCompleta);
                    console.log('El archivo fue eliminado correctamente.');
                } catch (error) {
                    console.error('Error al eliminar el archivo:', error);
                }
            } else {
                console.log('El archivo de la imagen no existe en el sistema de archivos.');
            }
        } catch (error) {
            console.error('Error al obtener la imagen de la marca:', error);
        }
    }
    

    static async delete(nombreMarca) {

        const connection = await db.getConnection();
        try {
          await connection.beginTransaction(); // Inicia una transacción
          await Marca.constructImagePath(nombreMarca);
          await connection.execute('call eliminarMarca(?);', [nombreMarca]);
          await connection.commit(); // Si todo va bien, confirma los cambios
          return 'Operación realizada con éxito';
        } catch (error) {
            await connection.rollback(); // Si hay un error, revierte los cambios
            console.log(error);
            return new Error('Error al eliminar marca');
        } finally {
            connection.release(); // Libera la conexión
        }
    }         

    static editName(marca, nuevonombre) {
        return db.execute(`CALL editName (?,?)`, [marca, nuevonombre])
            .then(result => {
                if (result[0].affectedRows === 0) {
                    console.log(marca)
                    throw new Error('Marca no encontrada');
                }
                return result;
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al actualizar la marca, cuidado de no duplicar marcas');
            });
    }

    static async eliminaImagenNueva(nuevolink){
        const rutaNuevaImagen = path.join('public/img/', nuevolink);
            fs.unlink(rutaNuevaImagen, (error) => {
                console.log('Imagen nueva eliminada');
                if (error) {
                    console.error('Error al eliminar imagen, eliminar la imagen nueva manualmente:');
                }
            });
    }

    static editImage(marca, nuevolink) {
        
        return db.execute(`SELECT imagen FROM imagenmarca WHERE nombre = ?`, [marca])
            .then(([rows, fields]) => {
                if (rows.length === 0) {
                    const rutaNuevaImagen = path.join('public/img/', nuevolink);
                    fs.unlink(rutaNuevaImagen, (error) => {
                        
                        console.log('Imagen nueva eliminada');
                        if (error) {
                            console.error('Error al cambiar imagen, eliminar la imagen nueva manualmente:');
                        }
                    });
                    
                    return new Error('Marca no encontrada');
                }
                else{
                    // Guardar la ruta de la imagen vieja
                    const rutaViejaImagen = path.join('public/img/', rows[0].imagen);
                        
                    // Actualizar el enlace de la imagen en la base de datos
                    return db.execute(`UPDATE imagenmarca SET imagen = ? WHERE nombre = ?`, [nuevolink, marca])
                    .then(result => {
                        fs.unlink(rutaViejaImagen, (error) => {
                            if (error) {
                                console.error('Error al eliminar la imagen vieja:');
                            }
                            console.log('La imagen vieja fue eliminada correctamente.');
                        });
                        return result;
                    })
                }            
            })
            .catch(error => {
                console.error(error);
                return new Error('Error al actualizar la imagen de la marca');
            });
    }


    // Extrae a todas los marcas unicamente se requiere el nombre y la imagen
    static fetchAll() {
        return db.execute(`SELECT nombre, imagen FROM imagenmarca;`);
    } 

    static findByName(brandname) {
        return db.execute(
            'SELECT * FROM imagenmarca WHERE nombre = ?',
            [brandname]
        );
    }
}