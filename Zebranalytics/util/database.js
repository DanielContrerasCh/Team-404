const mysql = require('mysql2');

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();

const pool = mysql.createPool({
    database: process.env.DB_NAME,
});


module.exports = pool.promise();