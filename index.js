// Importación de módulos externos para servidor de http y de websocket
const http = require('node:http');

// Importación de módulos propios
const app = require('./src/app');

// Configuración del fichero de entorno .env
require('dotenv').config();

// Creación de servidor HTTP
const server = http.createServer(app); //Creo el servidor e indico que todas las peticiones las gestionará la aplicación de express app (handler de peticiones)

// Ponemos al servidor HTTP a escuchar por el puerto asignado
const PORT = process.env.PORT || 3000;

server.listen(PORT);

server.on('listening', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});