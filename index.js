// Importación de módulos externos para servidor de http
const http = require('node:http');

// Importación de módulos propios
const app = require('./src/app');
const Message = require('./src/models/message.model');

// Configuración del fichero de entorno .env
require('dotenv').config();

// Configuración DB
require('./src/config/db');

// Creación de servidor HTTP
const server = http.createServer(app); //Creo el servidor e indico que todas las peticiones las gestionará la aplicación de express app (handler de peticiones)

// Ponemos al servidor HTTP a escuchar por el puerto asignado
const PORT = process.env.PORT || 3000;
server.listen(PORT);

server.on('listening', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});


// Configuración de servidor WEBSOCKET para Chat
const io = require('socket.io')(server, {
    cors: { origin: '*' }
});

io.on('connection', async (socket) => {

    console.log('a user has connected!');

    socket.on('disconnect', ()=> {
        console.log('a user has disconnected');
    });

    // Cuando se reciba nuevo mensaje en el chat, lo insertamos en base de datos y lo emitimos a todos los clientes conectados
    socket.on('chat_message_client', async (msg) => {

        try {
            const [result] = await Message.insertMessage(msg.idUsuario, msg.idGrupo, msg.fecha_hora, msg.texto);
            io.emit('chat_message_server', msg);
        } catch(error) {
            console.log(error);
        }
    });
});