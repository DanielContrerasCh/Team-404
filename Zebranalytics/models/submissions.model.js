const db = require('../util/database');

module.exports = class Submission {
    constructor(miEmail, miItemCode, miRespuestas) {
        this.email = miEmail;
        this.itemCode = miItemCode;
        this.respuestas = miRespuestas; // Esto será un arreglo de objetos { pregunta, respuesta }
    }

    static async save(email, itemCode, respuestas) {
        const conn = await db.getConnection();
        try {
            // Comenzar transacción
            conn.beginTransaction();

            // Insertar en la tabla de reseña primero
            const resenaResults = await conn.query(
                'INSERT INTO resena (ItemCode, EstadoContestacion, FechaContestacion, correoComprador) VALUES (?, 1, CURDATE(), ?)',
                [itemCode, email]
            );

            const idResena = resenaResults[0].insertId;

            // Ahora insertar cada respuesta en la tabla de bitacoraRespuestas
            for (const { pregunta, respuesta } of respuestas) {
                await conn.query(
                    'INSERT INTO bitacoraRespuestas (IDResena, Pregunta, Respuesta) VALUES (?, ?, ?)',
                    [idResena, pregunta, respuesta]
                );
            }

            // Confirmar la transacción
            await conn.commit();
        } catch (error) {
            // Revertir la transacción si hay un error
            if (conn) {
                await conn.rollback();
            }
            throw error;
        } finally {
            if (conn) {
                conn.release();
            }
        }
    }
};