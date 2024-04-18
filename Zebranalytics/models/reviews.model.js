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
        SELECT r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, rs.Visibilidad, rs.Titulo
        FROM resena r
        JOIN producto p ON r.ItemCode = p.ItemCode
        JOIN respuestas rs ON r.IDResena = rs.IDResena
        WHERE p.NombreMarca = ? AND QUARTER(r.FechaContestacion) = ? AND YEAR(r.FechaContestacion) = ?;
            `, [brand, quarter, year]);
    }

    static fetchAllForYear(brand, year) {
        return db.execute(`
        SELECT r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, rs.Visibilidad, rs.Titulo
        FROM resena r
        JOIN producto p ON r.ItemCode = p.ItemCode
        JOIN respuestas rs ON r.IDResena = rs.IDResena
        WHERE p.NombreMarca = ? AND QUARTER(r.FechaContestacion) = ?;
            `, [brand, year]);
    }
    
    static changeVisibility(IdResena){
        return db.execute(
            `UPDATE respuestas rs
            JOIN resena r ON rs.IDResena = r.IDResena
            JOIN producto p ON r.ItemCode = p.ItemCode
            SET rs.Visibilidad = CASE WHEN rs.Visibilidad = 1 THEN 0 ELSE 1 END
            WHERE r.IDResena = ?`,[IdResena])
    }


static fetchAllReviews() {
    return db.execute(`
    SELECT r.calificacion, r.IDResena, r.FechaContestacion, r.ItemCode,r.correoComprador ,p.NombreMarca, rs.Visibilidad, rs.Titulo
    FROM resena r
    JOIN producto p ON r.ItemCode = p.ItemCode
    JOIN respuestas rs ON r.IDResena = rs.IDResena;
    
    `);

}

static fetchPreguntas(brand){
    return db.execute(`
    SELECT Pregunta
    FROM preguntas
    WHERE NombreMarca = ?;
    `, [brand]);
}



}