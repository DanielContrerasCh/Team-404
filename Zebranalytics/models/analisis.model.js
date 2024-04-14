const db = require('../util/database')

module.exports = class Analiticas {
    constructor(miCalificacion, miId, miItem){
        this.Calificacion = miCalificacion,
        this.Id = miId,
        this.Item = miItem
        this.analytics = analytics
    }

static async fetchAllAnalytics() {
    try {
        const [rows, fields] = await db.execute(
            `
            SELECT 
                p.ItemCode,
                YEAR(r.FechaContestacion) AS Anio,
                MONTHNAME(r.FechaContestacion) AS NombreMes,
                AVG(rs.Calificacion) AS PromedioCalificaciones,
                COUNT(DISTINCT r.IDResena) AS NumVentas
            FROM 
                producto p
            JOIN 
                resena r ON p.ItemCode = r.ItemCode
            JOIN 
                respuestas rs ON r.IDResena = rs.IDResena
            GROUP BY 
                p.ItemCode, YEAR(r.FechaContestacion), MONTH(r.FechaContestacion)
            ORDER BY 
                p.ItemCode, Anio, MONTH(r.FechaContestacion);
        `
        );

        // Crear un array con los promedios de calificaciones
        const promedios = rows.map(row => parseFloat(row.PromedioCalificaciones));
            // Devolver el objeto con los resultados y los promedios
            return { analytics: rows, promedios };
            
        } catch (error) {
            // Manejar el error si la consulta falla
            console.error("Error fetching analytics:", error);
            throw error;
        }
    }
    
}