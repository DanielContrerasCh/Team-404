const db = require('../util/database')

module.exports = class Review {
    constructor(miItem,miCalificacion, miOpinion, miFechaDeContestacion, miTitulo, miVisibilidad, miComprador){
        this.item = miItem,
        this.calificacion = miCalificacion,
        this.opinion = miOpinion,
        this.fechaDeContestacion = miFechaDeContestacion,
        this.titulo = miTitulo,
        this.visibilidad = miVisibilidad,
        this.correoComprador = miComprador
    }


    static fetchSome(fromDate, toDate, brand){
        return db.execute(`
        SELECT m.NombreMarca, p.ItemCode, r.FechaContestacion, rs.Calificacion, rs.Opinion, rs.Titulo, rs.Visibilidad
        FROM Marca m
        JOIN Producto p ON m.NombreMarca = p.NombreMarca
        JOIN Resena r ON p.ItemCode = r.ItemCode
        JOIN Respuestas rs ON r.IDResena = rs.IDResena
        WHERE m.NombreMarca =? 
        AND r.FechaContestacion BETWEEN ? AND ?
        `, [brand, fromDate, toDate])
    }

    static changeVisibility(IdResena){
        return db.execute(
               `UPDATE Respuestas rs
               JOIN Resena r ON rs.IDResena = r.IDResena
               JOIN Producto p ON r.ItemCode = p.ItemCode
               SET rs.Visibilidad = CASE WHEN rs.Visibilidad = 1 THEN 0 ELSE 1 END
               WHERE r.IDResena = ?`,[IdResena])
    }

    static changeVisibility(IdResena){
        return db.execute(`
        SELECT c.CorreoComprador
        FROM Compra c
        WHERE c.IDCompra = 'ID_DE_LA_COMPRA_ESPECIFICA';

        `)
    }

static fetchAllReviews() {
    return db.execute(`
        SELECT m.NombreMarca, p.ItemCode, c.CorreoComprador, r.FechaContestacion, rs.Calificacion, rs.Opinion, rs.Titulo, rs.Visibilidad
        FROM Marca m
        JOIN Producto p ON m.NombreMarca = p.NombreMarca
        JOIN Resena r ON p.ItemCode = r.ItemCode
        JOIN Respuestas rs ON r.IDResena = rs.IDResena
        JOIN Compra c ON r.IDResena = c.IDResena;
    `);
}




}