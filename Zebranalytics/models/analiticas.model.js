const db = require('../util/database')

module.exports = class Analiticas {
    constructor(miCalificacion, miId, miItemCode){
        this.Calificacion = miCalificacion,
        this.Id = miId,
        this.ItemCode = miItemCode
    }


    static fetchAllBrands() {
        return db.execute(`
            SELECT DISTINCT m.Nombre AS NombreMarca
            FROM imagenmarca m
        `);
    }

    static fetchAllReviews(){
        return db.execute(`
            SELECT 
                p.NombreMarca,
                COUNT(r.ItemCode) AS TotalResenas
            FROM 
                producto p
            JOIN 
                resena r ON p.ItemCode = r.ItemCode
            JOIN
                imagenmarca m ON p.NombreMarca = m.Nombre
            GROUP BY 
                p.NombreMarca;
        `);
    
    }

    static fetchAnswers(){
        return db.execute(`
        SELECT 
        sub.NombreMarca,
        SUM(sub.TotalResenasContestadas) AS TotalResenasContestadas,
        SUM(sub.TotalVentas) AS TotalVentas
    FROM 
        (
            SELECT 
                p.NombreMarca,
                (SELECT COUNT(*) FROM resena WHERE EstadoContestacion = 1 AND resena.ItemCode = p.ItemCode) AS TotalResenasContestadas,
                COUNT(r.idResena) AS TotalVentas
            FROM 
                resena r
            JOIN 
                producto p ON r.ItemCode = p.ItemCode
            JOIN
                imagenmarca m ON p.NombreMarca = m.Nombre
            GROUP BY 
                p.NombreMarca,
                p.ItemCode
        ) AS sub
    GROUP BY 
        sub.NombreMarca;
    `);
    }


static async fetchSomeAnalyticsByBrandAndYear(brand, year) {
    try {
        const [rows1, fields1] = await db.execute(`
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
            YEAR(resena.FechaContestacion) = ? 
        GROUP BY 
            p.NombreMarca, 
            Anio, 
            Mes
        ORDER BY 
            Anio, Mes;
        `, [brand, year]);

        // Crear un array con los promedios de calificaciones
        const promedios1 = rows1.map(row => parseFloat(row.PromedioCalificacionMensual));

        const [rows2, fields2] = await db.execute(`
        SELECT 
        p.NombreMarca,
        YEAR(resena.FechaContestacion) AS Anio,
        FLOOR((MONTH(resena.FechaContestacion) - 1) / 3) + 1 AS Cuartil,
        AVG(resena.calificacion) AS PromedioCalificacionCuartil,
        GROUP_CONCAT(resena.calificacion ORDER BY resena.FechaContestacion) AS CalificacionesArray
    FROM 
        producto p
    JOIN 
        resena ON p.ItemCode = resena.ItemCode
    WHERE 
        p.NombreMarca = ? AND
        YEAR(resena.FechaContestacion) = ? 
    GROUP BY 
        p.NombreMarca, 
        Anio,
        Cuartil
    ORDER BY 
        Anio, Cuartil;
        `, [brand, year]);

        
        // Crear un array con los promedios de calificaciones
        const promedios2 = rows2.map(row => parseFloat(row.PromedioCalificacionCuartil));

        // Devolver el objeto con los resultados y los promedioS
        return {analytics1: {rows1, promedios1}, 
                analytics2: {rows2, promedios2}};
            
        } catch (error) {
            console.error("Error fetching analytics:", error);
            throw error;
        }
    }

    static async fetchSomeAnalyticsByItemCodeAndYear(itemCode, year) {
        try {
            const [rows, fields] = await db.execute(`
            SELECT 
            p.NombreMarca,
            YEAR(resena.FechaContestacion) AS Anio,
            MONTH(resena.FechaContestacion) AS Mes,
            QUARTER(resena.FechaContestacion) AS Cuartil,
            AVG(resena.calificacion) AS PromedioCalificacionCuartil,
            AVG(resena.calificacion) AS PromedioCalificacionMensual,
            GROUP_CONCAT(resena.calificacion ORDER BY resena.FechaContestacion) AS CalificacionesArray
        FROM 
            producto p
        JOIN 
            resena ON p.ItemCode = resena.ItemCode
        WHERE 
            p.ItemCode = ? AND
            YEAR(resena.FechaContestacion) = ? 
        GROUP BY 
            p.NombreMarca, 
            Anio, 
            Mes
        ORDER BY 
            Anio, Mes;
            `, [itemCode, year]);
    
            // Crear un array con los promedios de calificaciones
            const promedios = rows.map(row => parseFloat(row.PromedioCalificacionMensual));
    
            // Devolver el objeto con los resultados y los promedios
            return { analytics: rows, promedios };
                
            } catch (error) {
                console.error("Error fetching analytics:", error);
                throw error;
            }
        }
    

        static async fetchSomeAnalyticsByOnlyYear(year) {
            try {

                console.log("fetching by onlyyear")
                const [rows, fields] = await db.execute(`
                
                SELECT
                YEAR(resena.FechaContestacion) AS Anio,
                MONTH(resena.FechaContestacion) AS Mes,
                QUARTER(resena.FechaContestacion) AS Cuartil,
                AVG(resena.calificacion) AS PromedioCalificacionCuartil,
                AVG(resena.calificacion) AS PromedioCalificacionMensual,
                GROUP_CONCAT(resena.calificacion ORDER BY resena.FechaContestacion) AS CalificacionesArray
            FROM 
                producto p
            JOIN 
                resena ON p.ItemCode = resena.ItemCode
            WHERE 
                YEAR(resena.FechaContestacion) = ? 
            GROUP BY 
                Anio, 
                Mes
            ORDER BY 
                Anio, Mes;
                `, [year]);
        
                // Crear un array con los promedios de calificaciones
                const promedios = rows.map(row => parseFloat(row.PromedioCalificacionMensual));
        
                // Devolver el objeto con los resultados y los promedios
                return { analytics: rows, promedios };
                    
                } catch (error) {
                    console.error("Error fetching analytics by year:", error);
                    throw error;
                }
            }
    
    
             static async fetchSomeAnalyticsByOnlyYear(year) {
            try {

                console.log("fetching by onlyyear")
                const [rows, fields] = await db.execute(`
                
                SELECT
                YEAR(resena.FechaContestacion) AS Anio,
                MONTH(resena.FechaContestacion) AS Mes,
                QUARTER(resena.FechaContestacion) AS Cuartil,
                AVG(resena.calificacion) AS PromedioCalificacionCuartil,
                AVG(resena.calificacion) AS PromedioCalificacionMensual,
                GROUP_CONCAT(resena.calificacion ORDER BY resena.FechaContestacion) AS CalificacionesArray
            FROM 
                producto p
            JOIN 
                resena ON p.ItemCode = resena.ItemCode
            WHERE 
                YEAR(resena.FechaContestacion) = ? 
            GROUP BY 
                Anio, 
                Mes
            ORDER BY 
                Anio, Mes;
                `, [year]);
        
                // Crear un array con los promedios de calificaciones
                const promedios = rows.map(row => parseFloat(row.PromedioCalificacionMensual));
        
                // Devolver el objeto con los resultados y los promedios
                return { analytics: rows, promedios };
                    
                } catch (error) {
                    console.error("Error fetching analytics by year only:", error);
                    throw error;
                }
            }
        static async fetchSomeAnalyticsByOnlyBrand(brand) {
            try {

                console.log("fetching by onlyBrand")
                const [rows, fields] = await db.execute(`
                
                SELECT 
                p.NombreMarca,
                MONTH(resena.FechaContestacion) AS Mes,
                QUARTER(resena.FechaContestacion) AS Cuartil,
                AVG(resena.calificacion) AS PromedioCalificacionCuartil,
                AVG(resena.calificacion) AS PromedioCalificacionMensual,
                GROUP_CONCAT(resena.calificacion ORDER BY resena.FechaContestacion) AS CalificacionesArray
            FROM 
                producto p
            JOIN 
                resena ON p.ItemCode = resena.ItemCode
            WHERE 
                p.NombreMarca = ? 
            GROUP BY 
                p.NombreMarca, 
                Mes
            ORDER BY 
                p.NombreMarca, Mes;
                `, [brand]);
        
                // Crear un array con los promedios de calificaciones
                const promedios = rows.map(row => parseFloat(row.PromedioCalificacionMensual));
        
                // Devolver el objeto con los resultados y los promedios
                return { analytics: rows, promedios };
                    
                } catch (error) {
                    console.error("Error fetching analytics by brand only:", error);
                    throw error;
                }
            }

        static async fetchSomeAnalyticsByOnlyItemCode(itemCode) {
            try {

                console.log("fetching by onlyItemCode")
                const [rows, fields] = await db.execute(`
                
                SELECT 
                p.ItemCode,
                MONTH(resena.FechaContestacion) AS Mes,
                QUARTER(resena.FechaContestacion) AS Cuartil,
                AVG(resena.calificacion) AS PromedioCalificacionCuartil,
                AVG(resena.calificacion) AS PromedioCalificacionMensual,
                GROUP_CONCAT(resena.calificacion ORDER BY resena.FechaContestacion) AS CalificacionesArray
            FROM 
                producto p
            JOIN 
                resena ON p.ItemCode = resena.ItemCode
            WHERE 
                p.ItemCode = ? 
            GROUP BY 
                p.ItemCode, 
                Mes
            ORDER BY 
                p.ItemCode, Mes;
                `, [itemCode]);
        
                // Crear un array con los promedios de calificaciones
                const promedios = rows.map(row => parseFloat(row.PromedioCalificacionMensual));
        
                // Devolver el objeto con los resultados y los promedios
                return { analytics: rows, promedios };
                    
                } catch (error) {
                    console.error("Error fetching analytics by itemCode only:", error);
                    throw error;
                }
            }

            static async fetchSomeAnalyticsByEveryBrandEveryYear() {
                try {
                    console.log("fetching by EveryBrandEveryYear")
                    const [rows, fields] = await db.execute(`
                    
                    SELECT 
                    MONTH(resena.FechaContestacion) AS Mes,
                    QUARTER(resena.FechaContestacion) AS Cuartil,
                    AVG(resena.calificacion) AS PromedioCalificacionCuartil,
                    AVG(resena.calificacion) AS PromedioCalificacionMensual,
                    GROUP_CONCAT(resena.calificacion ORDER BY resena.FechaContestacion) AS CalificacionesArray
                FROM 
                    producto p
                JOIN 
                    resena ON p.ItemCode = resena.ItemCode 
                GROUP BY 
                    Mes
                ORDER BY 
                    Mes;
                    `);
            
                    // Crear un array con los promedios de calificaciones
                    const promedios = rows.map(row => parseFloat(row.PromedioCalificacionMensual));
            
                    // Devolver el objeto con los resultados y los promedios
                    return { analytics: rows, promedios };
                        
                    } catch (error) {
                        console.error("Error fetching analytics by EveryBrand EveryYear:", error);
                        throw error;
                    }
                }


               
    }