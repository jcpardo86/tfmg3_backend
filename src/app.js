// Importación de librerías externas
const express = require('express');
const cors = require('cors');
const path = require('path');


// Creación de la APP Express
const app = express();


app.use(express.json()); //Para que cuando me llegue una petición en la que se incluya un body de tipo JSON, podamos leerlo y transformarlo de string a objeto JS.


//Cors para habilitar acceso a API desde origen
app.use(cors([
    {
        origin: "localhost:4200",
        credentials: true
    }
]));


// Rutas
app.use('/api', require('./routes/api')) // Todas las peticiones que empiecen por /api se gestionarán en el fichero api.js

// Middleware error
app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message });
    next();
});

// Sirve archivos estáticos desde la carpeta images/user
app.use('/userimage', express.static(path.join(__dirname, 'images', 'user')));


// Sirve archivos estáticos desde la carpeta images/group
app.use('/groupimage', express.static(path.join(__dirname, 'images', 'group')));


//Exportación de app
module.exports = app;
