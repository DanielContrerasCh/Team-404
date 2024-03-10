const db = require('../util/database');

module.exports = class Preguntas {

    constructor(nombreMarca, estadoObligatorio, tipoPregunta, pregunta, categoria){
        this.marca = nombreMarca;
        this.typePregunta = tipoPregunta;
        this.estado = estadoObligatorio;
        this.pregunta = pregunta;
        this.categoria = categoria;
    }

    save() {
        return db.execute('INSERT INTO Preguntas (NombreMarca, TipoPregunta, EstadoObligatorio, Pregunta, Categoria) VALUES (?, ?, ?, ?, ?)',
        [this.marca, this.typePregunta, this.estado, this.pregunta, this.categoria]
    );
    }
    
    static fetchAll() {
       return db.execute('SELECT * FROM Preguntas');
    }
}
