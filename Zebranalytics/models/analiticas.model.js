const db = require('../util/database')

module.exports = class Analiticas {
    constructor(miCalificacion, miId, miItemCode){
        this.Calificacion = miCalificacion,
        this.Id = miId,
        this.ItemCode = miItemCode
        this.analytics = analytics
    }

static async fetchAllAnalytics() {
    try {
        const [rows, fields] = await db.execute(    `
                SELECT 
                p.NombreMarca, 
                r.Calificacion,
                r.Fecha
            FROM 
                producto p
            JOIN 
                resena ON p.ItemCode = resena.ItemCode
            JOIN 
                respuestas r ON resena.IDResena = r.IDResena
            WHERE 
                p.NombreMarca = 'LUUNA';
        `
        );

                // Supongamos que 'rows' es el resultado de tu consulta a la base de datos

        // Crear un objeto para almacenar los totales y los conteos
        var totals = {};
        var counts = {};

        // Iterar sobre cada fila
        for (let row of rows) {
            // Obtener el mes y el año de la fecha
            let date = new Date(row.Fecha);
            let month = date.getMonth();
            let year = date.getFullYear();

            // Crear una clave única para el mes y el año
            let key = year + '-' + month;

            // Si esta es la primera vez que vemos este mes/año, inicializar el total y el conteo
            if (!totals[key]) {
                totals[key] = 0;
                counts[key] = 0;
            }

            // Agregar la calificación al total y incrementar el conteo
            totals[key] += row.Calificacion;
            counts[key]++;
        }

        // Ahora que tenemos los totales y los conteos, podemos calcular los promedios
        var averages = {};
        for (let key in totals) {
            averages[key] = totals[key] / counts[key];
        }

        // Crear un array con los promedios de calificaciones
        const promedios = rows.map(row => parseFloat(row.PromedioCalificaciones));
        console.log(rows);

        // Devolver el objeto con los resultados y los promedios
        return { analytics: rows, promedios, averages };
            
        } catch (error) {
            console.error("Error fetching analytics:", error);
            throw error;
        }
    }
    
}