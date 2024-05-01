const zecore = require('../controllers/zecore.controller');

const Cronjob = require('./cronjob.model');

exports.checkTime = async () => {
    const { name, email, itemCode } =  await Cronjob.getTime();
    const idResena = await Cronjob.getReview(itemCode, email);
    await  zecore.postMail(name, email, itemCode, idResena);
}