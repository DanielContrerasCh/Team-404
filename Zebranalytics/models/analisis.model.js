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
                `SELECT 
                p.ItemCode,
                p.Nombre,
                YEAR(r.FechaContestacion) AS Anio,
                MONTHNAME(r.FechaContestacion) AS NombreMes,
                AVG(rs.Calificacion) AS PromedioCalificaciones,
                COUNT(DISTINCT p.ItemCode) AS NumVentas
            FROM 
                producto p
            JOIN 
                resena r ON p.ItemCode = r.ItemCode
            JOIN 
                respuestas rs ON r.IDResena = rs.IDResena
            WHERE 
                r.fechaContestacion >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 YEAR)
                AND r.fechaContestacion <= CURRENT_DATE()
            GROUP BY 
                p.itemCode, YEAR(r.FechaContestacion), MONTHNAME(r.FechaContestacion)
            ORDER BY 
                Anio, MONTH(r.fechaContestacion);
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