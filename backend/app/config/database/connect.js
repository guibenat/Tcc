const banco = require('mysql2');

//Usei o metodo pool 

const pool = banco.createPool({
    host: 'localhost',
    port: 3306,
    user: 'benas',
    password: 'benatte',
    database: 'lires_bd',
    waitForConnections: true, 
    connectionLimit: 10,
    queueLimit: 0
});

//Exportei com promise pra poder usar async await

module.exports = pool.promise();