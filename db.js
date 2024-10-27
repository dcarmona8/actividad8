const mysql = require('mysql2');

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',      // Cambia si tu base de datos está en un servidor diferente
    user: 'admin',           // Usuario de MySQL
    password: 'C0qu1t0', // Contraseña de MySQL
    database: 'ACTIVIDAD8'  // Nombre de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = db;
