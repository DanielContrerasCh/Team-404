const db = require('../util/database');

module.exports = class Preguntas {
    constructor(NombreMarca, EstadoObligatorio, TipoPregunta, Pregunta, Categoria) {
        this.marca = NombreMarca;
        this.tipoPregunta = TipoPregunta;
        this.estado = EstadoObligatorio;
        this.pregunta = Pregunta;
        this.categoria = Categoria;
    }

    save() {
        return db.execute(
            'INSERT INTO preguntas (NombreMarca, TipoPregunta, EstadoObligatorio, Pregunta, Categoria) VALUES (?, ?, ?, ?, ?)',
            [this.marca, this.tipoPregunta, this.estado, this.pregunta, this.categoria]
        );
    }

    static fetchByMarcaAndCategoria(marca, categoria) {
        return db.execute('SELECT * FROM preguntas WHERE NombreMarca = ? AND Categoria = ?', [marca, categoria]);
    }
    
    static fetchAll() {
        return db.execute('SELECT * FROM preguntas');
    }

    static deleteByMarcaAndCategoria(marca, categoria) {
        return db.execute('DELETE FROM preguntas WHERE NombreMarca = ? AND Categoria = ?', [marca, categoria]);
    }

    static edit_pregunta(id, nuevaPregunta, obligatorio, tipoPregunta) {
        return db.execute(`
            UPDATE preguntas 
            SET Pregunta = ?, EstadoObligatorio = ?, TipoPregunta = ? 
            WHERE IDPreguntas = ?`, [nuevaPregunta, obligatorio, tipoPregunta, id])
            .then(result => {
                if (result[0].affectedRows === 0) {
                    throw new Error('Pregunta no encontrada');
                }
                return result;
            })
            .catch(error => {
                console.log(error);
                throw new Error('Error al actualizar la pregunta');
            });
    }
    

}
