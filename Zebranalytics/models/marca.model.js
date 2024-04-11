const db = require('../util/database');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');


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
    }
    
    save() {
        return db.execute("INSERT INTO imagenMarca VALUES (?, ?)", 
            [this.nombre, this.imagen]
            
            // [this.nombre, this.imagen]
            )
        .catch((error => {
            console.log(error)
            throw Error('Error al guardar');
        }));
    }

    // static delete(marca){

    //     return db.execute(`DELETE FROM imagenmarca WHERE nombre =?`, [marca])
    //     .catch((error => {
    //         console.log(error)
    //         throw Error('Marca no encontrada');
    //     }));
    // }

    static delete(marca) {
        return db.execute(`SELECT imagen FROM imagenmarca WHERE nombre = ?`, [marca])
            .then(([rows, fields]) => {
                if (rows.length === 0) {
                    throw new Error('Marca no encontrada');
                }
                const rutaImagen = rows[0].imagen;
    
                // Construir la ruta completa del archivo
                const rutaCompleta = path.join('public/img/', rutaImagen);

                console.log(rutaCompleta)
                // Eliminar el archivo
                fs.unlink(rutaCompleta, (error) => {
                    if (error) {
                        console.error('Error al eliminar el archivo');
                        throw new Error('Error al eliminar el archivo');
                    }
                    console.log('El archivo fue eliminado correctamente.');
    
                    // Luego de eliminar el archivo, eliminar la fila de la base de datos
                    return db.execute(`DELETE FROM imagenmarca WHERE nombre = ?`, [marca]);
                });
            })
            .catch(error => {
                console.error(error);
                throw new Error('Error al eliminar la marca o el archivo');
            });
    }

    static edit_name(marca, nuevonombre) {
        return db.execute(`UPDATE imagenmarca SET nombre = ? WHERE nombre = ?`, [nuevonombre, marca])
            .then(result => {
                if (result[0].affectedRows === 0) {
                    throw new Error('Marca no encontrada');
                }
                return result;
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al actualizar la marca, cuidado de no duplicar marcas');
            });
    }

    // static edit_image(marca, nuevolink) {

    //     return db.execute(`UPDATE imagenmarca SET imagen = ? WHERE nombre = ?`, [nuevolink, marca])
    //         .then(result => {
    //             if (result[0].affectedRows === 0) {
    //                 throw new Error('Marca no encontrada');
    //             }
    //             return result;
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             throw new Error('Error al actualizar la imagen marca');
    //         });
    // }

    static edit_image(marca, nuevolink) {
        let rutaViejaImagen;
    
        return db.execute(`SELECT imagen FROM imagenmarca WHERE nombre = ?`, [marca])
            .then(([rows, fields]) => {
                if (rows.length === 0) {
                    const rutaNuevaImagen = path.join('public/img/', nuevolink);
                    fs.unlink(rutaNuevaImagen, (error) => {
                        
                        console.log('Imagen nueva eliminada');
                        if (error) {
                            alert('Error al eliminar la imagen nueva')
                            console.error('Error al eliminar la imagen nueva:');
                        }
                    });
                    
                    throw new Error('Marca no encontrada');
                }
    
                // Guardar la ruta de la imagen vieja
                rutaViejaImagen = path.join('public/img/', rows[0].imagen);
    
                // Actualizar el enlace de la imagen en la base de datos
                return db.execute(`UPDATE imagenmarca SET imagen = ? WHERE nombre = ?`, [nuevolink, marca]);
            })
            .then(result => {
                
                // Si la actualización es exitosa, eliminar la imagen vieja
                fs.unlink(rutaViejaImagen, (error) => {
                    if (error) {
                        console.error('Error al eliminar la imagen vieja:');
                    }
                    console.log('La imagen vieja fue eliminada correctamente.');
                });
    
                return result;
            })
            .catch(error => {
                console.error(error);
                throw new Error('Error al actualizar la imagen marca');
            });
    }

    // // Extrae una marca de la base de datos
    // static fetchOne(marca) {
    //     return db.execute('SELECT * FROM imagenmarca WHERE nombre = ?', [marca]);
    //  }

    // Extrae a todas los marcas unicamente se requiere el nombre y la imagen
    static fetchAll() {
        return db.execute(`SELECT nombre, imagen FROM imagenmarca;`);
    } 

    //  // Obtiene los permisos del usuario (no probado)
    // static getImagen(marca){
    //     return db.execute(`SELECT imagen FROM imagenmarca;`, [marca])
    // }
}