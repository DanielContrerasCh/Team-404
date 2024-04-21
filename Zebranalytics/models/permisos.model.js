const db = require('../util/database');
const bcrypt = require('bcryptjs');

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
        INNER JOIN rol R ON A.IDRol = R.IDRol
        ORDER BY IDRol, IDPermiso;`)
    } 

    static fetchPermisos() {
        return db.execute(`SELECT * FROM permiso;`)
    } 

    static fetchRoles() {
        return db.execute(`SELECT * FROM rol WHERE IDRol <> 0;`)
    } 

    static asigna(rol, idpermiso) {
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

    static getRolByName(nombre){
        return db.execute(`SELECT * FROM rol WHERE Descripcion = ?`, [nombre])
    }

    static desasigna(rol, idpermiso) {
        console.log("Desasignando permiso")
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
    
    static newRol(rolNombre, rolPermisos, correo) {
        let rolId;
        return db.execute(`INSERT INTO rol (Descripcion) VALUES (?);`, [rolNombre])
            .then(result => {
                if (result[0].affectedRows === 0) {
                    throw new Error('Error al crear nuevo rol');
                }
                rolId = result[0].insertId;
                const promises = [];
                if (Array.isArray(rolPermisos)) {
                    rolPermisos.forEach(permiso => {
                        promises.push(db.execute(`INSERT INTO asignado (idrol, idpermiso) VALUES (?, ?);`, [rolId, permiso]));
                    });
                } else {
                    promises.push(db.execute(`INSERT INTO asignado (idrol, idpermiso) VALUES (?, ?);`, [rolId, rolPermisos]));
                }
                return Promise.all(promises);
            })
            .then(() => {
                return db.execute('SET @creator_name = ?', [correo]);
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al crear nuevo rol');
            });
    }

    static deleteRol(rolId) {
        return db.execute(`CALL deleteRol(?)`, [rolId])
            .then(result => {
                if (result[0].affectedRows === 0) {
                    throw new Error('Error al eliminar el rol');
                }
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al eliminar el rol');
            });
    }

    static renombrarRol(rolId, rolNombre) {
        return db.execute(`UPDATE rol SET Descripcion = ? WHERE IDRol = ?;`, [rolNombre, rolId])
            .then(result => {
                if (result[0].affectedRows === 0) {
                    throw new Error('Error al renombrar el rol');
                }
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al renombrar el rol');
            });
    }
}