const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-zebranalytic.alwaysdata.net',
    user: '352013_free',
    database: 'zebranalytic_zebranalytics',
    password: '404yMara',
});


module.exports = pool.promise();