const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'zebranalytics',
    password: '',
    multipleStatements: true,
});


module.exports = pool.promise();