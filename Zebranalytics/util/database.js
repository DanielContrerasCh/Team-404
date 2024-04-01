const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'zebranalytics',
    password: '5569',
    multipleStatements: true,
});


module.exports = pool.promise();