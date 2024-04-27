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

    static fetchAllBrands() {
        return db.execute(`
            SELECT DISTINCT m.Nombre AS NombreMarca
            FROM imagenmarca m
        `);
    }

    static fetchAllProducts() { 
        return db.execute(`
            SELECT p.ItemCode, p.NombreMarca, p.WebsiteIMG, p.Title, p.Description, p.WebName
            FROM producto p
        `);
    }

    static fetchProductByBrand(brand) {
        return db.execute(`
            SELECT p.ItemCode, p.NombreMarca, p.WebsiteIMG, p.Title, p.Description, p.WebName
            FROM producto p
            WHERE p.NombreMarca = ?
        `, [brand]);
    }

   static fetchProductByItemCode(itemCode) {
    return db.execute(`
        SELECT p.ItemCode, p.NombreMarca, p.WebsiteIMG, p.Title, p.Description, p.WebName
        FROM producto p
        WHERE p.ItemCode LIKE ?
    
    `, ['%' + itemCode + '%']);
}

}