const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class User {

    constructor(mi_nombre, mi_correo, mi_password){
        this.nombre = mi_nombre;
        this.correo = mi_correo;
        this.password = mi_password;
    }

    save() {
        return bcrypt.hash(this.password, 12)
        .then((password_cifrado) =>{
            return db.execute('INSERT INTO usuario (CorreoEmpleado, Nombre, Password) VALUES (?, ?, ?)',
            [this.correo, this.nombre, password_cifrado]);})
        .catch((error => {
            console.log(error)
            throw Error('Nombre de usuario duplicado');
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
                            AND a.IDPermiso = per.IDPermiso;`,
                            [correo])
    }
}