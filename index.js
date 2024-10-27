// Importar módulo express
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para manejar JSON (APIs REST)
app.use(express.json());

// Definir rutas con prefijo api
const postsRoutes = require('./routes/posts');
const autoresRoutes = require('./routes/autores');
app.use('/api/posts', postsRoutes);
app.use('/api/autores', autoresRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
