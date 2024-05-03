const zecore = require('../controllers/zecore.controller');

const Cronjob = require('./cronjob.model');

const cron = require('node-cron');

async function processCronjobs(cronjobResult) {
    for(let cronjob of cronjobResult) {
        let name = cronjob.name;
        let email = cronjob.email;
        let itemCode = cronjob.itemCode;
        try {
            let [idResena, fieldData] = await Cronjob.getReview(itemCode, email);
            await zecore.postMail(name, email, itemCode, idResena[0].IDResena);
            console.log('Mail sent successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    }
}


module.exports = cron.schedule('* 9 * * 1-7', () => {
    Cronjob.getTime().then(([cronjobResult, fieldData]) => {
    if(cronjobResult != undefined && cronjobResult.length > 0) {
        processCronjobs(cronjobResult);
    } else {
        console.log('No results');
    }
})},{
    timezone: "America/Mexico_City"
});
