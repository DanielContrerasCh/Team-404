const db = require('../util/database');

module.exports = class Submission {
    constructor(miRespuestas, miCalificacion, miIdResena) {
        this.idResena = miIdResena;
        this.respuestas = miRespuestas; // Esto será un arreglo de objetos { pregunta, respuesta }
        this.calificacion = miCalificacion;
    }

    // Utiliza comentarios claros y maneja adecuadamente la asincronía y los errores
static async save(respuestas, calificacion, idResena) {
    // Obtener la conexión de la base de datos
    const conn = await db.getConnection();

    const [rows] = await conn.query('SELECT EstadoContestacion FROM resena WHERE idResena = ?', [idResena]);
    if(rows[0].EstadoContestacion == 1){
        conn.release();
        throw new Error('Duplicate answers not allowed');
    };

    try {
        // Iniciar la transacción
        await conn.beginTransaction();
        let aux = calificacion[0].res;
        await conn.query(
            'UPDATE resena SET EstadoContestacion = 1, Visibilidad = 0, calificacion = ?, FechaContestacion = CURDATE() WHERE idResena = ?',
            [aux, idResena] // Agregar la calificación al final
        );

        // Procesar cada respuesta individual
        for (let { pregunta, respuesta } of respuestas) {
            // Extraer solo el ID de la pregunta
            let preguntaID = pregunta.split('respuesta')[1].split('_')[0];

                // Consultar el texto de la pregunta basado en el ID
                let preguntaTexto;

                let preguntaRows = await conn.query(
                    'SELECT Pregunta FROM preguntas WHERE IDPreguntas = ?',
                    [preguntaID]
                );
                if (preguntaRows.length === 0 || preguntaRows[0].length === 0) {
                    throw new Error(`No se encontró la pregunta con ID: ${preguntaID}`);
                }
                preguntaTexto = preguntaRows[0][0].Pregunta;
                

            // Insertar cada respuesta en la tabla bitacoraRespuestas
            await conn.query(
                'INSERT INTO bitacoraRespuestas (IDResena, Pregunta, Respuesta) VALUES (?, ?, ?)',
                [idResena, preguntaTexto, respuesta]
            );
        }

        // Confirmar la transacción si todo es correcto
        await conn.commit();
    } catch (error) {
        // Revertir la transacción en caso de error
        await conn.rollback();
        console.error("Error en la transacción:", error);
        throw error; // Propagar el error para manejo externo si es necesario
    } finally {
        // Liberar la conexión en cualquier caso
        if (conn) {
            conn.release();
        }
    }
}
};