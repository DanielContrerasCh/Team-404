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


    static fetchSome(date) {
        return db.execute(`
        SELECT * FROM respuestas
        WHERE YEAR(Fecha) = YEAR(?)
        AND QUARTER(Fecha) = QUARTER(?);
        `)
    }
    
    static changeVisibility(IdResena){
        return db.execute(
            `UPDATE Respuestas rs
            JOIN Resena r ON rs.IDResena = r.IDResena
            JOIN Producto p ON r.ItemCode = p.ItemCode
            SET rs.Visibilidad = CASE WHEN rs.Visibilidad = 1 THEN 0 ELSE 1 END
            WHERE r.IDResena = ?`,[IdResena])
    }


static fetchAllReviews() {
    return db.execute(`
    SELECT r.IDResena, m.NombreMarca, p.ItemCode, c.CorreoComprador, r.FechaContestacion, rs.Calificacion, rs.Opinion, rs.Titulo, rs.Visibilidad,
    (SELECT GROUP_CONCAT(Pregunta SEPARATOR ', ') FROM preguntas WHERE NombreMarca = 'LUUNA') AS PreguntasLuuna
    FROM Producto p
    LEFT JOIN Marca m ON p.NombreMarca = m.NombreMarca
    LEFT JOIN Resena r ON p.ItemCode = r.ItemCode
    LEFT JOIN Respuestas rs ON r.IDResena = rs.IDResena
    LEFT JOIN Compra c ON r.IDResena = c.IDResena
    ORDER BY r.FechaContestacion DESC;

    
    `);
}

static fetchPreguntas(){
    return db.execute(`
    SELECT Pregunta
    FROM preguntas
    WHERE NombreMarca = '?';

    `,[brand]);
}



}