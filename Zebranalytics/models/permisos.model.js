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
        return db.execute(`SELECT A.idrol, A.idpermiso, P.accion, P.descripcion, R.Descripcion AS Rol
        FROM asignado A
        INNER JOIN permiso P ON A.idpermiso = P.idpermiso
        INNER JOIN rol R ON A.IDRol = R.IDRol;`)
    } 

    static asigna(rol, idpermiso) {
        console.log(rol);
        console.log(idpermiso);
        return db.execute(`INSERT INTO asignado (idrol, idpermiso)
            SELECT tmp.idrol, tmp.idpermiso FROM (SELECT ? as idrol, ? as idpermiso) AS tmp
            WHERE NOT EXISTS (
                SELECT idrol, idpermiso FROM asignado WHERE idrol = ? AND idpermiso = ?
            ) LIMIT 1;`, [rol, idpermiso, rol, idpermiso])
            .then(result => {
                if (result[0].affectedRows === 0) {
                    throw new Error('Error, revisar si el rol ya tenía el permiso');
                }
                return result;
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al asignar nuevo permiso');
            });
    }

    static desasigna(rol, idpermiso) {
        console.log("Desasignando permiso")
        console.log("rol: ",rol);
        console.log("idpermiso: ",idpermiso);
        return db.execute(`DELETE FROM asignado
        WHERE IDRol = ? AND IDPermiso = ?;`, [rol, idpermiso])
            .then(result => {
                if (result[0].affectedRows === 0) {
                    throw new Error('Error al eliminar el permiso, evita eliminar permisos que no estan asignados');
                }
                return result;
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al desasignar permiso');
            });
    }
    // static selectSomeDescripcion(IDPerm) {
    //     return db.execute(`SELECT descripcion FROM permiso WHERE IDPermiso = ?`, [IDPerm])
    // } 
}