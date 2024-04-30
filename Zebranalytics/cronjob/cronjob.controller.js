const zecore = require('../controllers/zecore.controller');

const Cronjob = require('./cronjob.model');

exports.checkTime = async () => {
    const cronjobResult =  await Cronjob.getTime();
    if(cronjobResult) {
        const { name, email, itemCode } = cronjobResult;
        const idResena = await Cronjob.getReview(itemCode, email);
        await  zecore.postMail(name, email, itemCode, idResena);
    } else {
        console.log('No results');
    }
}