const db = require('../util/database')

module.exports = class Producto {
    constructor(miNombre, miItemCode, miNombreCategoria, miNombreMarca, miWebsiteIMG, miTitle, miDescription, miWebName) {
        this.Nombre = miNombre;
        this.ItemCode = miItemCode;
        this.categoria_nombre = miNombreCategoria;
        this.NombreMarca = miNombreMarca;
        this.WebsiteIMG = miWebsiteIMG;
        this.Title = miTitle;
        this.Description = miDescription;
        this.WebName = miWebName;
    }

    async insertarProducto() {
        return db.execute(`INSERT INTO producto (Nombre, ItemCode, categoria_nombre, NombreMarca, WebsiteIMG, Title, Description, WebName) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
            [this.Nombre, this.ItemCode, this.categoria_nombre, this.NombreMarca, this.WebsiteIMG, this.Title, this.Description, this.WebName])
            .then(() => {
                console.log("Información insertada con éxito");
            })
            .catch((error => {
                console.error("Error executing query: ", error);
            }));
    }

    static async encuesta(itemCode) {
        try {
            const [results, fields] = await db.execute(`
                SELECT 
                    p.NombreMarca,
                    p.categoria_nombre,
                    q.IDPreguntas,
                    q.Pregunta,
                    q.TipoPregunta,
                    o.IDopcion,
                    o.TextoOpcion
                FROM
                    producto AS p
                JOIN
                    preguntas AS q ON p.NombreMarca = q.NombreMarca AND p.categoria_nombre = q.Categoria
                LEFT JOIN
                    opciones_pregunta AS o ON q.IDPreguntas = o.IDPreguntas AND q.TipoPregunta IN ('Checkbox', 'OpcionMultiple')
                WHERE
                    p.ItemCode = ?`, [itemCode]);
    
            // Procesar resultados para agrupar opciones por pregunta
            const preguntasMap = new Map();
    
            results.forEach(row => {
                if (!preguntasMap.has(row.IDPreguntas)) {
                    preguntasMap.set(row.IDPreguntas, {
                        NombreMarca: row.NombreMarca,
                        CategoriaNombre: row.categoria_nombre,
                        IDPreguntas: row.IDPreguntas,
                        Pregunta: row.Pregunta,
                        TipoPregunta: row.TipoPregunta,
                        Opciones: []
                    });
                }
    
                if (row.IDopcion) {  // Solo añadir si hay una opción disponible
                    preguntasMap.get(row.IDPreguntas).Opciones.push({
                        IDopcion: row.IDopcion,
                        TextoOpcion: row.TextoOpcion
                    });
                }
            });
    
            return Array.from(preguntasMap.values());
        } catch (error) {
            console.error("Error executing query: ", error);
            throw error;
        }
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