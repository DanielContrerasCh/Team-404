const db = require('../util/database');

module.exports = class Preguntas {

    constructor(nombreMarca, tipoPregunta, estadoObligatorio){
        this.marca = nombreMarca;
        this.pregunta = tipoPregunta;
        this.estado = estadoObligatorio;
    }

    save() {
        return db.execute('INSERT INTO Preguntas (NombreMarca, TipoPregunta, EstadoObligatorio) VALUES (?, ?, ?)',
        [this.marca, this.pregunta, this.estado]
    );
    }
    
    static fetchAll() {
       return db.execute('SELECT * FROM Preguntas');
    }
}
