const db = require('../util/database');
const bcrypt = require('bcryptjs');

const permisos = {
    "Admin": 1,
    "CRM": 2,
    "Empleado": 3,
};

module.exports = class DataPermisos {

    constructor(rol_nombre, rol_descripcion){
        // this.id = marca_id;
        this.nombre = rol_nombre;
        this.descripcion = rol_descripcion;
    }

    static fetchAll() {
        // return db.execute(`SELECT IDRol, IDpermiso FROM asignado;`);
        return db.execute(`SELECT A.idrol, A.idpermiso, P.accion, P.descripcion
            FROM asignado A
            INNER JOIN permiso P ON A.idpermiso = P.idpermiso;`)
    } 

    // static selectSomeDescripcion(IDPerm) {
    //     return db.execute(`SELECT descripcion FROM permiso WHERE IDPermiso = ?`, [IDPerm])
    // } 
}