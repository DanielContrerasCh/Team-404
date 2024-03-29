const db = require('../util/database');
const bcrypt = require('bcryptjs');

const roles = {
    "Administrador": 1,
    "CRM": 2,
    "Analista": 3,
};

module.exports = class User {

    constructor(mi_nombre, mi_correo, mi_password, mi_rol){
        this.nombre = mi_nombre;
        this.correo = mi_correo;
        this.password = mi_password;
        this.rol = mi_rol;
    }

    //Guardar empleado en base de datos
    save() {
        return bcrypt.hash(this.password, 12)
        .then((password_cifrado) =>{ //Ciframos contraseña
            return db.execute(`INSERT INTO usuario (CorreoEmpleado, Nombre, Password) VALUES (?, ?, ?);`, 
            [this.correo, this.nombre, password_cifrado]
            );})
            .then(() =>{ //Y despues le otorgamos su rol
                return db.execute(`INSERT INTO rol_usuario (IDRol, CorreoEmpleado, FechaAsignacion) VALUES (?, ?, CURRENT_DATE());`, 
                [roles[this.rol], this.correo]
                );})
        .catch((error => {
            console.log(error)
            throw Error('Nombre de usuario duplicado');
        }));
    }

    //Todavía no funciona, pero se encarga de borrar el usuario
    static delete(correo){
        return db.execute(`DELETE FROM rol_usuario WHERE CorreoEmpleado =?`, [correo])
        .then((correo) =>{
            return db.execute(`DELETE FROM rol_usuario WHERE CorreoEmpleado =?`, [correo])
        })
        .catch((error => {
            console.log(error)
            throw Error('Correo de empleado no encontrado');
        }));
    }

    // Extrae un usuario de la base de datos
    static fetchOne(correo) {
        return db.execute('SELECT * FROM usuario WHERE CorreoEmpleado = ?', [correo]);
     }

    // Extrae a todos los usuarios
    static fetchAll() {
        return db.execute(`SELECT 
        u.Nombre,
        per.descripcion AS descripcion,
        r.descripcion AS Rol,
        rp.fechaAsignacion AS fechaAsignacion
    FROM 
        usuario u
        INNER JOIN rol_usuario rp ON u.CorreoEmpleado = rp.CorreoEmpleado
        INNER JOIN rol r ON rp.IDRol = r.IDRol
        INNER JOIN asignado a ON r.IDRol = a.IDRol
        INNER JOIN permiso per ON a.IDPermiso = per.IDPermiso
    GROUP BY 
        u.Nombre;`);
    } 

     // Obtiene los permisos del usuario
    static getPermisos(correo){
        return db.execute(`SELECT Accion
                            FROM usuario u, asignado a, rol r, rol_usuario rp, permiso per 
                            WHERE u.CorreoEmpleado = ?  AND u.CorreoEmpleado = rp.CorreoEmpleado
                            AND rp.IDRol = r.IDRol AND r.IDRol = a.IDRol
                            AND a.IDPermiso = per.IDPermiso
                            ORDER BY r.IDRol DESC;`,
                            [correo])
    }
}