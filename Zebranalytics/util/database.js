const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'proyecto',
    password: 'M.j.15102004',
    multipleStatements: true,
});


module.exports = pool.promise();