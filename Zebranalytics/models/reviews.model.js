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

    static fetchByBrandYearAndQuarter(brand, year, quarter) {
        return db.execute(`
        SELECT  r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
        FROM resena r
        JOIN producto p ON r.ItemCode = p.ItemCode
        WHERE p.NombreMarca = ? AND QUARTER(r.FechaContestacion) = ? AND YEAR(r.FechaContestacion) = ?
        ORDER BY r.FechaContestacion DESC;
        ;`, [brand, quarter, year]);
    }

    static fetchAllForBrandAndYear(brand, year) {
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

static fetchOnlyForItemCode(itemCode){
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.ItemCode = ? AND r.FechaContestacion IS NOT NULL
    ORDER BY r.FechaContestacion DESC;
    `, [itemCode]);
}

static fetchByItemCodeAndQuarter(itemCode, quarter) {
    return db.execute(`
    SELECT r.IDResena,r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.ItemCode = ? AND QUARTER(r.FechaContestacion) = ?
    ORDER BY r.FechaContestacion DESC;
        `, [itemCode, quarter]);
}

static fetchAllForItemCodeAndYear(itemCode, year) {
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.ItemCode = ?  AND YEAR(r.FechaContestacion) = ?
    ORDER BY r.FechaContestacion DESC;

        `, [itemCode, year]);
}

static fetchByItemCodeYearAndQuarter(itemCode, year, quarter) {
    return db.execute(`
    SELECT  r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.ItemCode = ? AND QUARTER(r.FechaContestacion) = ? AND YEAR(r.FechaContestacion) = ?
    ORDER BY r.FechaContestacion DESC;
    ;`, [itemCode, quarter, year]);
}

//Estrellas ///////////////

static fetchPreguntasAndRespuestasAndStars(stars) {
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.ItemCode, r.FechaContestacion, r.correoComprador, r.Visibilidad, r.flagged
    FROM resena r
    WHERE r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;

    `, [stars]);
}

static fetchOnlyForQuarterAndStars(quarter, stars){
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE QUARTER(r.FechaContestacion) = ? AND r.FechaContestacion IS NOT NULL AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;
    `, [quarter, stars]);

}

static fetchOnlyForYearAndStars(year, stars){
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE YEAR(r.FechaContestacion) = ? AND r.FechaContestacion IS NOT NULL AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;
    `, [year, stars]);
}

static fetchAllForYearAndQuarterAndStars(year, quarter, stars) { 
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE QUARTER(r.FechaContestacion) = ? AND YEAR(r.FechaContestacion) = ? AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;
        `, [quarter, year, stars]);
}

static fetchOnlyForBrandAndStars(brand, stars){
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.NombreMarca = ? AND r.FechaContestacion IS NOT NULL AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;
    `, [brand, stars]);
}

static fetchByBrandAndQuarterAndStars(brand, quarter, stars) {
    return db.execute(`
    SELECT r.IDResena,r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.NombreMarca = ? AND QUARTER(r.FechaContestacion) = ? AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;
        `, [brand, quarter, stars]);
}

static fetchAllForBrandAndYearAndStars(brand, year, stars) {
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.NombreMarca = ?  AND YEAR(r.FechaContestacion) = ? AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;

        `, [brand, year, stars]);
}

static fetchByBrandYearAndQuarterAndStars(brand, year, quarter, stars) {
    return db.execute(`
    SELECT  r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.NombreMarca = ? AND QUARTER(r.FechaContestacion) = ? AND YEAR(r.FechaContestacion) = ? AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;
    ;`, [brand, quarter, year, stars]);
}

static fetchOnlyForItemCodeAndStars(itemCode, stars){
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.ItemCode = ? AND r.FechaContestacion IS NOT NULL AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;
    `, [itemCode, stars]);
}

static fetchByItemCodeAndQuarterAndStars(itemCode, quarter, stars) {
    return db.execute(`
    SELECT r.IDResena,r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.ItemCode = ? AND QUARTER(r.FechaContestacion) = ? AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;
        `, [itemCode, quarter, stars]);
}

static fetchAllForItemCodeAndYearAndStars(itemCode, year, stars) {
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.ItemCode = ?  AND YEAR(r.FechaContestacion) = ? AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;

        `, [itemCode, year, stars]);
}

static fetchByItemCodeYearAndQuarterAndStars(itemCode, year, quarter, stars) {
    return db.execute(`
    SELECT  r.IDResena, r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, r.Visibilidad, r.flagged
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    WHERE p.ItemCode = ? AND QUARTER(r.FechaContestacion) = ? AND YEAR(r.FechaContestacion) = ? AND r.calificacion = ?
    ORDER BY r.FechaContestacion DESC;
    ;`, [itemCode, quarter, year, stars]);
}


static fetchAllVisibleReviews() {
    return db.execute(`
    SELECT r.IDResena, r.calificacion, r.ItemCode, r.FechaContestacion, r.correoComprador, r.Visibilidad, r.flagged,
       b.pregunta, b.respuesta
    FROM resena r
    INNER JOIN bitacoraRespuestas b ON r.IDResena = b.IDResena
    WHERE r.EstadoContestacion = 1 AND r.Visibilidad = 1 AND flagged = 0
    ORDER BY r.FechaContestacion DESC;
    `);
}

}