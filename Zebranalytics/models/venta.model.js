const db = require('../util/database')

module.exports = class Venta {
    constructor(miName, miLast_name, miItemCode, miEmail) {
        this.name = miName;
        this.Last_name = miLast_name;
        this.ItemCode = miItemCode;
        this.email = miEmail;
    }

    async insertarVenta() {
        const conn = await db.getConnection();
        try {
            await conn.beginTransaction();
            await conn.query(`INSERT INTO venta (name, last_name, itemCode, email) VALUES (?, ?, ?, ?)`, 
                [this.name, this.Last_name, this.ItemCode, this.email])
            const resenaAux = await conn. query('INSERT INTO resena (ItemCode, correoComprador) VALUES (?, ?)',
                [this.ItemCode, this.email]);
            await conn.commit();
            return resenaAux[0].insertId;
        } catch (error) {
            await conn.rollback();
            console.error("Error en la transacción:", error);
            throw error;
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }

    static getHeaderImagePath(ItemCode) {
        return db.execute('SELECT c.header FROM producto p JOIN categorias c ON p.NombreMarca = c.nombre_marca AND p.categoria_nombre = c.categoria_nombre WHERE ItemCode = ?', [ItemCode])
        .then(([rows]) => {
            if (rows.length === 0) {
                throw new Error('No se encontró producto del Item Code');
            }
            return rows[0].header; // Devuelve la ruta de la imagen de cabecera
        })
        .catch(error => {
            console.log(error);
            throw new Error('Error al obtener el producto');
        });
    }

    static getFooterImagePath(ItemCode) {
        return db.execute('SELECT c.footer FROM producto p JOIN categorias c ON p.NombreMarca = c.nombre_marca AND p.categoria_nombre = c.categoria_nombre WHERE ItemCode = ?', [ItemCode])
        .then(([rows]) => {
            if (rows.length === 0) {
                throw new Error('No se encontró producto del Item Code');
            }
            return rows[0].footer; // Devuelve la ruta de la imagen de cabecera
        })
        .catch(error => {
            console.log(error);
            throw new Error('Error al obtener el producto');
        });
    }
}