// Fichero configuración para conexión con BBDD

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
})

// Las queries se gestionarán a través de promesas.
global.db = pool.promise(); 