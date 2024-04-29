const db = require('../util/database')

module.exports = class Review {
    constructor(miID, miItem,miCalificacion, miOpinion, miFechaDeContestacion, miTitulo, miVisibilidad, miComprador){
        this.miId = miID,
        this.item = miItem,
        this.calificacion = miCalificacion,
        this.opinion = miOpinion,
        this.fechaDeContestacion = miFechaDeContestacion,
        this.titulo = miTitulo,
        this.visibilidad = miVisibilidad,
        this.correoComprador = miComprador
    }

    static fetchAllBrands() {
        return db.execute(`
            SELECT DISTINCT m.Nombre AS NombreMarca
            FROM imagenmarca m
        `);
    }

    static fetchSome(brand, quarter, year) {
        return db.execute(`
        SELECT  r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
        FROM resena r
        JOIN producto p ON r.ItemCode = p.ItemCode
        WHERE p.NombreMarca = ? AND QUARTER(r.FechaContestacion) = ? AND YEAR(r.FechaContestacion) = ?
        ORDER BY r.FechaContestacion DESC;
        ;`, [brand, quarter, year]);
    }

    static fetchAllForYear(brand, year) {
        return db.execute(`
        SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
        FROM resena r
        JOIN producto p ON r.ItemCode = p.ItemCode
        WHERE p.NombreMarca = ?  AND YEAR(r.FechaContestacion) = ?
        ORDER BY r.FechaContestacion DESC;

            `, [brand, year]);
    }

    
    static fetchByBrandAndQuarter(brand, quarter) {
        return db.execute(`
        SELECT r.IDResena,r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
        FROM resena r
        JOIN producto p ON r.ItemCode = p.ItemCode
        WHERE p.NombreMarca = ? AND QUARTER(r.FechaContestacion) = ?
        ORDER BY r.FechaContestacion DESC;
            `, [brand, quarter]);
    }
    
    static fetchAllForYearAndQuarter(year, quarter) { 
        return db.execute(`
        SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
        FROM resena r
        JOIN producto p ON r.ItemCode = p.ItemCode
        WHERE QUARTER(r.FechaContestacion) = ? AND YEAR(r.FechaContestacion) = ?
        ORDER BY r.FechaContestacion DESC;
            `, [quarter, year]);
    }


    static changeVisibility(IdResena){
        return db.execute(
            `UPDATE resena
            SET Visibilidad = CASE 
                        WHEN Visibilidad = 0 THEN 1 
                        WHEN Visibilidad = 1 THEN 0 
                        ELSE Visibilidad 
                    END
            WHERE IDResena = ?;
            `,[IdResena])
    }


static fetchAllReviews() {
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.ItemCode, r.FechaContestacion, r.correoComprador, r.Visibilidad, r.flagged
    FROM resena r
    WHERE r.EstadoContestacion = 1
    ORDER BY r.FechaContestacion DESC;
        
    
    `);

}

static fetchPreguntasAndRespuestas(){
    return db.execute(`
    SELECT 
    IDResena,
    GROUP_CONCAT(Pregunta SEPARATOR '|') AS Preguntas,
    GROUP_CONCAT(Respuesta SEPARATOR '|') AS Respuestas
    FROM 
        bitacoraRespuestas
    GROUP BY 
        IDResena;
        `);
}

static fetchOnlyForYear(year){
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE YEAR(r.FechaContestacion) = ? AND r.FechaContestacion IS NOT NULL
    ORDER BY r.FechaContestacion DESC;
    `, [year]);
}

static fetchOnlyForQuarter(quarter){
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE QUARTER(r.FechaContestacion) = ? AND r.FechaContestacion IS NOT NULL
    ORDER BY r.FechaContestacion DESC;
    `, [quarter]);

}

static fetchOnlyForBrand(brand){
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.NombreMarca = ? AND r.FechaContestacion IS NOT NULL
    ORDER BY r.FechaContestacion DESC;
    `, [brand]);
}

static fetchByItemCode(itemCode) {
    return db.execute(`
        SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
        FROM resena r
        JOIN producto p ON r.ItemCode = p.ItemCode
        WHERE r.ItemCode = ?
        ORDER BY r.FechaContestacion DESC;
    `, [itemCode]);
}

}