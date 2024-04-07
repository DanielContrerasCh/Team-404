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


    static fetchSome(brand) {
        return db.execute(`
        SELECT r.IDResena, m.Nombre AS NombreMarca, p.ItemCode, c.CorreoComprador, r.FechaContestacion, rs.Calificacion, rs.Opinion, rs.Titulo, rs.Visibilidad,
        (SELECT GROUP_CONCAT(Pregunta SEPARATOR ', ') FROM preguntas WHERE NombreMarca = 'LUUNA') AS PreguntasLuuna
        FROM resena r
        LEFT JOIN producto p ON r.ItemCode = p.ItemCode
        LEFT JOIN imagenmarca m ON p.NombreMarca = m.Nombre
        LEFT JOIN respuestas rs ON r.IDResena = rs.IDResena
        LEFT JOIN compra c ON r.IDResena = c.IDResena
        WHERE m.Nombre = ?;
        `, [brand]);
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
    SELECT r.IDResena, m.Nombre AS NombreMarca, p.ItemCode, c.CorreoComprador, r.FechaContestacion, rs.Calificacion, rs.Opinion, rs.Titulo, rs.Visibilidad,
    (SELECT GROUP_CONCAT(Pregunta SEPARATOR ', ') FROM preguntas WHERE NombreMarca = 'LUUNA') AS PreguntasLuuna
    FROM resena r
    LEFT JOIN producto p ON r.ItemCode = p.ItemCode
    LEFT JOIN imagenmarca m ON p.NombreMarca = m.Nombre
    LEFT JOIN respuestas rs ON r.IDResena = rs.IDResena
    LEFT JOIN compra c ON r.IDResena = c.IDResena
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