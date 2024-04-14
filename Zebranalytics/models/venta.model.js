const db = require('../util/database')

module.exports = class Venta {
    constructor(miName, miLast_name, miItemCode, miEmail) {
        this.name = miName;
        this.Last_name = miLast_name;
        this.ItemCode = miItemCode;
        this.email = miEmail;
    }

    async insertarVenta() {
        return db.execute(`INSERT INTO venta (name, last_name, itemCode, email) VALUES (?, ?, ?, ?)`, 
            [this.name, this.Last_name, this.ItemCode, this.email])
            .then(() => {
                console.log("Información insertada con éxito");
            })
            .catch((error => {
                console.error("Error executing query: ", error);
            }))
    }
}