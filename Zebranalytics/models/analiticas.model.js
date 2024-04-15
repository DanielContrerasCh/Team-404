const db = require('../util/database')

module.exports = class Analiticas {
    constructor(miCalificacion, miId, miItemCode){
        this.Calificacion = miCalificacion,
        this.Id = miId,
        this.ItemCode = miItemCode
    }

    static async fetchAnalytics() {
        try {
            const [rows, fields] = await db.execute(`
            SELECT 
                p.NombreMarca,
                YEAR(r.Fecha) AS Anio,
                MONTH(r.Fecha) AS Mes,
                AVG(r.Calificacion) AS PromedioCalificacionMensual,
                GROUP_CONCAT(r.Calificacion ORDER BY r.Fecha) AS CalificacionesArray
            FROM 
                producto p
            JOIN 
                resena ON p.ItemCode = resena.ItemCode
            JOIN 
                respuestas r ON resena.IDResena = r.IDResena
            WHERE 
                p.NombreMarca = 'LUUNA'
            GROUP BY 
                p.NombreMarca, 
                Anio, 
                Mes
            ORDER BY 
                Anio, Mes;
            `);

            // Crear un array con los promedios de calificaciones
            const promedios = rows.map(row => parseFloat(row.PromedioCalificacionMensual));

            // Devolver el objeto con los resultados y los promedios
            return { analytics: rows, promedios };
                
            } catch (error) {
                console.error("Error fetching analytics:", error);
                throw error;
            }
        }

static async fetchSomeAnalytics(brand) {
    try {
        const [rows, fields] = await db.execute(`
        SELECT 
            p.NombreMarca,
            YEAR(r.Fecha) AS Anio,
            MONTH(r.Fecha) AS Mes,
            AVG(r.Calificacion) AS PromedioCalificacionMensual,
            GROUP_CONCAT(r.Calificacion ORDER BY r.Fecha) AS CalificacionesArray
        FROM 
            producto p
        JOIN 
            resena ON p.ItemCode = resena.ItemCode
        JOIN 
            respuestas r ON resena.IDResena = r.IDResena
        WHERE 
            p.NombreMarca = ?
        GROUP BY 
            p.NombreMarca, 
            Anio, 
            Mes
        ORDER BY 
            Anio, Mes;
        `, [brand]);

        // Crear un array con los promedios de calificaciones
        const promedios = rows.map(row => parseFloat(row.PromedioCalificacionMensual));

        // Devolver el objeto con los resultados y los promedios
        return { analytics: rows, promedios };
            
        } catch (error) {
            console.error("Error fetching analytics:", error);
            throw error;
        }
    }
    
}