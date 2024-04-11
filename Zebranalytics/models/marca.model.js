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
        return db.execute("call agregarImagenMarca(?,?);", 
            [this.nombre, this.imagen]
            
            // [this.nombre, this.imagen]
            )
        .catch((error => {
            console.log(error)
            throw Error('Error al guardar');
        }));
    }

    // static delete(marca) {
    //     return db.execute(`SELECT imagen FROM imagenmarca WHERE nombre = ?`, [marca])
    //         .then(([rows, fields]) => {
    //             if (rows.length === 0) {
    //                 throw new Error('Marca no encontrada');
    //             }
    //             const rutaImagen = rows[0].imagen;
    
    //             // Construir la ruta completa del archivo
    //             const rutaCompleta = path.join('public/img/', rutaImagen);

    //             console.log(rutaCompleta)
    //             // Eliminar el archivo
    //             fs.unlink(rutaCompleta, (error) => {
    //                 if (error) {
    //                     console.error('Error al eliminar el archivo');
    //                     throw new Error('Error al eliminar el archivo');
    //                 }
    //                 console.log('El archivo fue eliminado correctamente.');
    
    //                 // Luego de eliminar el archivo, eliminar la fila de la base de datos
    //                 return db.execute(`DELETE FROM imagenmarca WHERE nombre = ?`, [marca]);
    //             });
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             throw new Error('Error al eliminar la marca o el archivo');
    //         });
    // }

    // Método para eliminar una categoría por su nombre y marca
    // static async delete(nombreMarca) {
    //     const connection = await db.getConnection();
    //     try {
    //         await connection.beginTransaction(); // Inicia una transacción

        
            
    //         const [nombreCategorias] = await connection.execute(
    //             `SELECT categoria_nombre FROM categorias WHERE nombre_marca = ?`,
    //             [nombreMarca]
                
    //         );
            
            
    //         for (const categoria of nombreCategorias) {

    //             // Obtener IDs de preguntas asociadas a la categoría
    //             console.log(categoria)
    //             console.log(nombreMarca);

    //             const [preguntas] = await connection.execute(
    //                 `SELECT IDPreguntas FROM preguntas WHERE NombreMarca = ? AND Categoria = ?`
    //                 [nombreMarca, categoria.categoria_nombre]
    //             );

    //             console.log("Preguntas: ", preguntas)
        
    //             // Eliminar opciones de las preguntas encontradas
    //             for (const pregunta of preguntas) {
    //                 await connection.execute(
    //                     'DELETE FROM opciones_pregunta WHERE IDPreguntas = ?',
    //                     [pregunta.IDPreguntas]
    //                 );
    //             }

    //             // Eliminar las preguntas asociadas a la categoría si las hay
    //             if (preguntas.length > 0) {
    //                 await connection.execute(
    //                     'DELETE FROM preguntas WHERE NombreMarca = ? AND Categoria = ?',
    //                     [nombreMarca, categoria]
    //                 );
    //             }

    //             // Eliminar las categorias asociadas a la marca si las hay (deberia de haber pues se itera sobre las categorias existentes)
    //             if (nombreCategorias.length > 0){
    //                 await connection.execute(
    //                     'DELETE FROM categorias WHERE NombreMarca = ? AND categoria_nombre = ?',
    //                     [nombreMarca, categoria]
    //                 );
    //             }

    //         }


    //         // Tratar de eliminar la imagen de los archivos (de no ser posible enviar mensaje de error y continuar con la eliminacion)

    //         // trycatch de eliminar imagen, si no se puede eliminar se pide que se continue con la eliminación de marca
        
    //         try {
    //             const [rows, fields] = await connection.execute(`SELECT imagen FROM imagenmarca WHERE nombre = ?`, [nombreMarca]);
        
    //             if (rows.length === 0) {
    //                 throw new Error('Marca no encontrada');
    //             }
        
    //             const rutaImagen = rows[0].imagen;
        
    //             // Construir la ruta completa del archivo
    //             const rutaCompleta = path.join('public/img/', rutaImagen);
        
    //             console.log(rutaCompleta);
        
    //             // Eliminar el archivo
    //             await new Promise((resolve, reject) => {
    //                 fs.unlink(rutaCompleta, (error) => {
    //                     if (error) {
    //                         console.error('Error al eliminar el archivo');
    //                         reject(new Error('Error al eliminar el archivo'));
    //                         return;
    //                     }
    //                     console.log('El archivo fue eliminado correctamente.');
    //                     resolve();
    //                 });
    //             });
        
    //             console.log('El archivo fue eliminado correctamente.');

    //         } catch (error) {
    //             console.error(error);
    //             throw new Error('Error al eliminar el archivo');
    //         }

    //         // Finalmente, eliminar la marca
    //         await connection.execute(
    //             'DELETE FROM imagenmarca WHERE nombre_marca = ?',
    //             [nombreMarca]
    //         );

    //         console.log("antes del commit");

    //         await connection.commit(); // Confirma los cambios si todo va bien
    //     } catch (error) {
    //         console.log(error);
    //         await connection.rollback(); // Revierte los cambios en caso de error
    //         throw new Error('Error al eliminar la marca, sus categoría y sus preguntas y opciones asociadas');
    //     } finally {
    //         connection.release(); // Libera la conexión
    //     }
    // }

    static constructImagePath(nombre) {
        console.log("Nombre de la marca recibido:", nombre);
        db.execute(`SELECT imagen FROM imagenmarca WHERE nombre = ?`, [nombre])
        .then(([rows, fields]) => {
            console.log("Resultado de la consulta SQL:", rows);
            if (rows.length === 0) {
                console.log('La marca no tiene una imagen asociada.');
                return; // No hay necesidad de continuar si no hay imagen asociada
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
        })
        .catch(error => {
            console.error('Error al obtener la imagen de la marca:', error);
        });
    }
    

    static async delete(nombreMarca) {

        const connection = await db.getConnection();
        console.log("PASO1")
        try {

          await connection.beginTransaction(); // Inicia una transacción

          await Marca.constructImagePath(nombreMarca);
          await connection.execute('call eliminarMarca(?)', [nombreMarca]);
          
          await connection.commit(); // Si todo va bien, confirma los cambios
          return 'Operación realizada con éxito';
        } catch (error) {
            await connection.rollback(); // Si hay un error, revierte los cambios
            console.log(error);
            throw new Error('Error al renombrar la categoría y actualizar la tabla de preguntas');
        } finally {
            connection.release(); // Libera la conexión
        }
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