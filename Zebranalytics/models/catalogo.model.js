const db = require('../util/database');

module.exports = class Catalogo {
    constructor(miItemCode,  miNombreMarca, miWebsiteIMG,  miTitle, miDescription, miWebName){
        this.itemCode = miItemCode,
        this.nombreMarca = miNombreMarca,
        this.websiteIMG = miWebsiteIMG,
        this.title = miTitle,
        this.description = miDescription,
        this.webName = miWebName
    }

    static fetchAllProducts() { 
        return db.execute(`
            SELECT p.ItemCode, m.Nombre AS NombreMarca, p.WebsiteIMG, p.Title, p.Description, p.WebName
            FROM producto p
            LEFT JOIN imagenmarca m ON p.NombreMarca = m.Nombre
        `);
    }

}