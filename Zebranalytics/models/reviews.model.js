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
            SELECT m.NombreMarca, p.ItemCode, r.FechaContestacion, rs.Calificacion, rs.Opinion, rs.Titulo, rs.Visibilidad
            FROM marca m
            JOIN producto p ON m.NombreMarca = p.NombreMarca
            JOIN resena r ON p.ItemCode = r.ItemCode
            JOIN respuestas rs ON r.IDResena = rs.IDResena
            
            JOIN compra c ON r.IDResena = c.IDResena
            
            WHERE m.NombreMarca = ?
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
    SELECT r.IDResena, m.NombreMarca, p.ItemCode, c.CorreoComprador, r.FechaContestacion, rs.Calificacion, rs.Opinion, rs.Titulo, rs.Visibilidad
    FROM marca m
    JOIN producto p ON m.NombreMarca = p.NombreMarca
    JOIN resena r ON p.ItemCode = r.ItemCode
    JOIN respuestas rs ON r.IDResena = rs.IDResena
    JOIN compra c ON r.IDResena = c.IDResena
    ORDER BY r.FechaContestacion DESC;
    
    `);
}




}