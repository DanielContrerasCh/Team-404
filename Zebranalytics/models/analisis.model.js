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
                `SELECT p.ItemCode,
                COUNT(r.IDResena) AS TotalResenas,
                AVG(rs.Calificacion) AS PromedioCalificaciones
                FROM Producto p
                JOIN Resena r ON p.ItemCode = r.ItemCode
                JOIN Respuestas rs ON r.IDResena = rs.IDResena
                WHERE r.FechaContestacion >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 YEAR)
                GROUP BY p.ItemCode;`
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