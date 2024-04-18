const db = require('../util/database')

module.exports = class Analiticas {
    constructor(miCalificacion, miId, miItemCode){
        this.Calificacion = miCalificacion,
        this.Id = miId,
        this.ItemCode = miItemCode
    }


static async fetchSomeAnalyticsByBrandAndYear(brand, year) {
    try {
        const [rows, fields] = await db.execute(`
        SELECT 
    p.NombreMarca,
    YEAR(resena.FechaContestacion) AS Anio,
    MONTH(resena.FechaContestacion) AS Mes,
    AVG(resena.calificacion) AS PromedioCalificacionMensual,
    GROUP_CONCAT(resena.calificacion ORDER BY resena.FechaContestacion) AS CalificacionesArray
FROM 
    producto p
JOIN 
    resena ON p.ItemCode = resena.ItemCode
WHERE 
    p.NombreMarca = ? AND
    YEAR(resena.FechaContestacion) = ? -- Agregar el año específico aquí
GROUP BY 
    p.NombreMarca, 
    Anio, 
    Mes
ORDER BY 
    Anio, Mes;
        `, [brand, year]);

        // Crear un array con los promedios de calificaciones
        const promedios = rows.map(row => parseFloat(row.PromedioCalificacionMensual));

        // Devolver el objeto con los resultados y los promedios
        return { analytics: rows, promedios };
            
        } catch (error) {
            console.error("Error fetching analytics:", error);
            throw error;
        }
    }

    static async fetchSomeAnalyticsByItemCode(itemCode) {
        try {
            const [rows, fields] = await db.execute(`
                        SELECT 
                p.NombreMarca,
                YEAR(resena.FechaContestacion) AS Anio,
                MONTH(resena.FechaContestacion) AS Mes,
                AVG(resena.calificacion) AS PromedioCalificacionMensual,
                GROUP_CONCAT(resena.calificacion ORDER BY resena.FechaContestacion) AS CalificacionesArray
            FROM 
                producto p
            JOIN 
                resena ON p.ItemCode = resena.ItemCode
            WHERE 
                p.ItemCode = ?
            GROUP BY 
                p.NombreMarca, 
                Anio, 
                Mes
            ORDER BY 
                Anio, Mes;
            `, [itemCode]);
    
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