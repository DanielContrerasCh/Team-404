const Submission = require('../models/submissions.model');

exports.postSubmission = async (request, response, next) => {

    // Extraer email y ItemCode directamente
    const { email, ItemCode } = request.body;

    // Extraer respuestas y formatearlas en un arreglo
    const respuestas = Object.keys(request.body)
        .filter(key => key.startsWith('respuesta'))
        .map(key => {
            const pregunta = key;
            const respuesta = request.body[key];
            return { pregunta, respuesta };
        });

    const calificacion = Object.keys(request.body)
    .filter(key => key.startsWith('calificacion'))
    .map(key => {
        const desc = key;
        const res = request.body[key];
        return { desc, res };
    });
    

    // Ahora llamar a save con todos los parámetros necesarios
    Submission.save(email, ItemCode, respuestas, calificacion)
        .then(() => {
            return response
            .status(200)
            .json({
                message: "Información procesada exitosamente",
            });
        })
        .catch((error) => {
            console.log("Error processing info " + error);
            return response
            .status(500)
            .json({ message: "Error al procesar la información" });
        });
}