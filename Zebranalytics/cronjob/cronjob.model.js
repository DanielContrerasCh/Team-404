const db = require('../util/database');

module.exports = class Cronjob {
    static getTime() {
        return db.execute(`
        SELECT DISTINCT venta.name, venta.email, venta.itemCode
        FROM venta
        JOIN producto ON venta.ItemCode = producto.ItemCode
        JOIN categorias ON producto.NombreMarca = categorias.nombre_marca
        WHERE DATE_ADD(venta.created_at, INTERVAL categorias.TiempoEncuesta MINUTE) = CURDATE();
        `);
    }

    static getReview(itemCode, correoComprador) {
        return db.execute(`SELECT IDResena FROM resena WHERE itemCode = ? 
            AND correoComprador = ?
        `, [itemCode, correoComprador]);
    }
}