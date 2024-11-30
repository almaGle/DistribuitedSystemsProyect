const mysql = require('mysql')
const util = require('util')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || 'mysql', // Usa una variable de entorno o 'mysql' como valor por defecto
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root_password',
    database: process.env.MYSQL_DATABASE || 'rrhh',
    connectTimeout: 30000,
    acquireTimeout: 30000,
    waitForConnections: true
});

pool.query = util.promisify(pool.query);
module.exports = pool;

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
        connection.release();
    }
});



