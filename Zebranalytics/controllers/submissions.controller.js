const Submission = require('../models/submissions.model')

exports.postSubmission = async (request, response, next) => {
    console.log(request.body);
    Submission.save(request.body.email, request.body.itemCode)
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