const mysql = require('mysql2');

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();

const pool = mysql.createPool({
    host: 'mysql-zebranalytic.alwaysdata.net',
    user: process.env.USER_NAME_DB,
    database: 'zebranalytic_zebranalytics',
    password: process.env.USER_NAME_PWD,
});


module.exports = pool.promise();