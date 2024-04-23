const db = require('../util/database');

module.exports = class Submission {
    constructor(miEmail, miItemCode, miRespuestas) {
        this.email = miEmail;
        this.itemCode = miItemCode;
        this.respuestas = miRespuestas; // Esto será un arreglo de objetos { pregunta, respuesta }
    }

    // Utiliza comentarios claros y maneja adecuadamente la asincronía y los errores
static async save(email, itemCode, respuestas) {
    // Obtener la conexión de la base de datos
    const conn = await db.getConnection();

    try {
        // Iniciar la transacción
        await conn.beginTransaction();

        // Insertar en la tabla de reseña primero
        const resenaResults = await conn.query(
            'INSERT INTO resena (ItemCode, EstadoContestacion, FechaContestacion, correoComprador) VALUES (?, 1, CURDATE(), ?)',
            [itemCode, email]
        );

        // Extraer el ID de reseña insertado
        const idResena = resenaResults[0].insertId;

        console.log('respuestas', respuestas)

        // Procesar cada respuesta individual
        for (let { pregunta, respuesta } of respuestas) {
            // Extraer solo el ID de la pregunta
            let preguntaID = pregunta.split('respuesta')[1].split('_')[0];
            let opcionID = pregunta.split('_')[1];

                // Consultar el texto de la pregunta basado en el ID
                let preguntaTexto;
                let respuesta2;
                if (pregunta.includes('_')) {
                    let opcionesRows = await conn.query(
                        'SELECT TextoOpcion FROM opciones_pregunta WHERE IDPreguntas = ?',
                        [preguntaID]
                    );
                    
                    console.log('opciones', opcionesRows);
                    if (opcionesRows.length === 0 || opcionesRows[0].length === 0) {
                        throw new Error(`No se encontraron opciones para la pregunta con ID: ${preguntaID}`);
                    }

                    let uniqueOption = opcionesRows[0][opcionID].TextoOpcion;
                    console.log('pregunta rows: ')
                    console.log(opcionesRows[opcionID][opcionID]);
                    console.log('unique option: ');
                    console.log(uniqueOption);

                    respuesta2 = uniqueOption;
                } else respuesta2 = respuesta;

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
                [idResena, preguntaTexto, respuesta2]
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