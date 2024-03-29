const db = require('../util/database');

module.exports = class Preguntas {
    constructor(NombreMarca, EstadoObligatorio, TipoPregunta, Pregunta, Categoria){
        this.marca = NombreMarca;
        this.typePregunta = TipoPregunta;
        this.estado = EstadoObligatorio;
        this.pregunta= Pregunta;
        this.categoria = Categoria;
    }

    // Guarda la pregunta que ingresa el usuario
    save() {
        return db.execute('INSERT INTO Preguntas (NombreMarca, TipoPregunta, EstadoObligatorio, Pregunta, Categoria) VALUES (?, ?, ?, ?, ?)',
        [this.marca, this.typePregunta, this.estado, this.pregunta, this.categoria]
    );
    }

    // ESTO ES PARA CAMBIAR LAS PREGUNTAS, TODAVÍA NO FUNCIONA
    // HACER STATIC Y PASAR ID COMO PARA PARAMETTRO PARA HACER LO QUE VIMOS EN CLASE HOY DE PASAR PARAMETRO POR URL
    static modify(){
        // let IDPreguntas = db.execute('SELECT IDPreguntas FROM preguntas;');
        return db.execute("UPDATE Preguntas SET Pregunta = ?  WHERE IDPreguntas = 1", [this.pregunta]);
    }
    
    static fetchAll() {
       return db.execute('SELECT * FROM Preguntas');
    }
}
