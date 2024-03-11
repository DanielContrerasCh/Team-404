const db = require('../util/database');

module.exports = class Preguntas {
    constructor(NombreMarca, EstadoObligatorio, TipoPregunta, Pregunta, Categoria){
        this.marca = NombreMarca;
        this.typePregunta = TipoPregunta;
        this.estado = EstadoObligatorio;
        this.pregunta= Pregunta;
        this.categoria = Categoria;
    }

    save() {
        return db.execute('INSERT INTO Preguntas (NombreMarca, TipoPregunta, EstadoObligatorio, Pregunta, Categoria) VALUES (?, ?, ?, ?, ?)',
        [this.marca, this.typePregunta, this.estado, this.pregunta, this.categoria]
    );
    }

    modify(){
        // let IDPreguntas = db.execute('SELECT IDPreguntas FROM preguntas;');
        return db.execute("UPDATE Preguntas SET Pregunta = ?  WHERE IDPreguntas = 1", [this.pregunta]);

        
        
    }
    
    static fetchAll() {
       return db.execute('SELECT * FROM Preguntas');
    }
}
