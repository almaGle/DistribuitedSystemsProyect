const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql-container',
    port: 3310,
    user: 'root',
    password: 'root_password',
    database: 'rrhh',
    connectTimeout: 30000,     // Aumentar tiempo de conexión
    acquireTimeout: 30000,     // Aumentar tiempo para adquirir la conexión
    waitForConnections: true
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


