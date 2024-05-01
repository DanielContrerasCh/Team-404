const zecore = require('../controllers/zecore.controller');

const Cronjob = require('./cronjob.model');

const cron = require('node-cron');

module.exports = cron.schedule('* * * * *', () => {
    Cronjob.getTime().then(([cronjobResult, fieldData]) => {
    console.log(cronjobResult)
    console.log("waiting..")
    if(cronjobResult != undefined && cronjobResult.length > 0) {
        console.log("sending mail..")
        const { name, email, itemCode } = cronjobResult[0];
        console.log(name, email, itemCode)
        Cronjob.getReview(itemCode, email)
            .then(([idResena, fieldData]) => {
                console.log(idResena);
                return zecore.postMail(name, email, itemCode, idResena);
            })
            .then(() => {
                console.log('Mail sent successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        console.log('No results');
    }
})},{
    timezone: "America/Mexico_City"
});
