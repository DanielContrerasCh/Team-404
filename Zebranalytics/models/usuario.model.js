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

    asignRole(){
        return db.execute('INSERT INTO rol_usuario (IDRol, CorreoEmpleado) VALUES (?, ?)', [roles[this.rol], this.correo])
    }

    save() {
        return bcrypt.hash(this.password, 12)
        .then((password_cifrado) =>{
            return db.execute(`INSERT INTO usuario (CorreoEmpleado, Nombre, Password) VALUES (?, ?, ?);`, 
            [this.correo, this.nombre, password_cifrado]
            );})
            .then(() =>{
                return db.execute(`INSERT INTO rol_usuario (IDRol, CorreoEmpleado) VALUES (?, ?);`, 
                [roles[this.rol], this.correo]
                );})
        .catch((error => {
            console.log(error)
            throw Error('Nombre de usuario duplicado');
        }));

    }

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

    static fetchOne(correo) {
        return db.execute('SELECT * FROM usuario WHERE CorreoEmpleado = ?', [correo]);
     }

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