const db = require('../util/database');
const bcrypt = require('bcryptjs');

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
        return db.execute("INSERT INTO ImagenMarca VALUES (?,?);", 
            [this.nombre, this.imagen])
        .catch((error => {
            console.log(error)
            throw Error('Error al guardar');
        }));
    }

    static delete(marca){
        return db.execute(`DELETE FROM imagenmarca WHERE nombre =?`, [marca])
        .catch((error => {
            console.log(error)
            throw Error('Marca no encontrada');
        }));
    }

    // Extrae una marca de la base de datos
    static fetchOne(marca) {
        return db.execute('SELECT * FROM imagenmarca WHERE nombre = ?', [marca]);
     }

    // Extrae a todas los marcas unicamente se requiere el nombre y la imagen
    static fetchAll() {
        return db.execute(`SELECT nombre, imagen FROM imagenmarca;`);
    } 

     // Obtiene los permisos del usuario (no probado)
    static getImagen(marca){
        return db.execute(`SELECT imagen FROM imagenmarca;`, [marca])
    }
}