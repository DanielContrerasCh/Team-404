const db = require('../util/database');

module.exports = class Cronjob {
    static getTime() {
        return db.execute(`
        SELECT DISTINCT venta.name, venta.email, venta.itemCode
        FROM venta
        JOIN producto ON venta.ItemCode = producto.ItemCode
        JOIN categorias ON producto.NombreMarca = categorias.nombre_marca
        WHERE DATE(venta.created_at) = CURDATE() - INTERVAL categorias.TiempoEncuesta DAY;
        `);
    }

    static getReview(itemCode, correoComprador) {
        return db.execute(`SELECT IDResena FROM resena WHERE itemCode = ? 
            AND correoComprador = ?
            ORDER BY IDResena DESC;
        `, [itemCode, correoComprador]);
    }
}