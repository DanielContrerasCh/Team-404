const Submission = require('../models/submissions.model')

exports.postSubmission = async (request, response, next) => {
    Submission.save()
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