const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql-container',
    user: 'root',
    password: 'root_password',
    database: 'rrhh',
    port: 3306
})

pool.query = util.promisify(pool.query)
module.exports = pool

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
        connection.release();
    }
});


