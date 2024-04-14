const db = require('../util/database')

module.exports = class Producto {
    constructor(miNombre, miItemCode, miNombreMarca, miWebsiteIMG, miTitle, miDescription, miWebName) {
        this.Nombre = miNombre;
        this.ItemCode = miItemCode;
        this.NombreMarca = miNombreMarca;
        this.WebsiteIMG = miWebsiteIMG;
        this.Title = miTitle;
        this.Description = miDescription;
        this.WebName = miWebName;
    }

    async insertarProducto() {
        return db.execute(`INSERT INTO producto (Nombre, ItemCode, NombreMarca, WebsiteIMG, Title, Description, WebName) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [this.Nombre, this.ItemCode, this.NombreMarca, this.WebsiteIMG, this.Title, this.Description, this.WebName])
            .then(() => {
                console.log("Información insertada con éxito");
            })
            .catch((error => {
                console.error("Error executing query: ", error);
            }));
    }

    static async eliminarProducto(ItemCode) {
        return db.execute(`DELETE FROM producto WHERE ItemCode = ?`, 
            [ItemCode])
            .then(() => {
                console.log("Producto eliminado con éxito");
            })
            .catch((error => {
                console.error("Error executing query: ", error);
            }));
    }

    static async modificarProducto(Nombre, ItemCode, NombreMarca, WebsiteIMG, Title, Description, WebName) {
        console.log(Nombre)
        return db.execute(`UPDATE producto
                            SET Nombre = ?,
                                NombreMarca = ?,
                                WebsiteIMG = ?,
                                Title = ?,
                                Description = ?,
                                WebName = ?
                            WHERE ItemCode = ?;
                            `, 
                            [Nombre, NombreMarca, WebsiteIMG, Title, Description, WebName, ItemCode])
            .then(() => {
                console.log("Producto modificado con éxito");
            })
            .catch((error => {
                console.error("Error executing query: ", error);
            }));
    }
}