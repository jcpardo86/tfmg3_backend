// Importación de módulos externos para servidor de http y de websocket
const http = require('node:http');
const { Server } = require('socket.io');

// Importación de módulos propios
const app = require('./src/app');
const Chat = require('./src/models/chat.model');

// Configuración del fichero de entorno .env
require('dotenv').config();

// Configuración DB
require('./src/config/db');

// Creación de servidor HTTP
const server = http.createServer(app); //Creo el servidor e indico que todas las peticiones las gestionará la aplicación de express app (handler de peticiones)

// Creación de servidor WEBSOCKET para Chat
const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
    //connectionStateRecovery: {}   
});

// Ponemos al servidor HTTP a escuchar por el puerto asignado
const PORT = process.env.PORT || 3000;

server.listen(PORT);

server.on('listening', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});


// CHAT - Ponemos al servidor de websockets a la escucha de una nueva conexión
let myMessages = [];

io.on('connection', async (socket) =>{

    console.log('a user has connected!');

    socket.on('disconnect', ()=>{
        console.log('a user has disconnected');
    });

    // Cuando se produzca una nueva conexión desde lado cliente, emitimos desde el servidor el histórico de mensajes del chat
    try {
        const [result] = await Chat.selectMessages(2);
        console.log(result);
        myMessages = result;
        socket.emit('text-event', myMessages);
        socket.broadcast.emit('text-event', myMessages);
        
    } catch(error) {
        console.log(error);
    }

    // Cuando se reciba nuevo mensaje en el chat, lo insertamos en base de datos y lo emitimos a todos los clientes conectados
    socket.on('send-message', async (msg) => {

        try {
            const [result] = await Chat.insertMessage(msg.texto, 2, msg.grupo);
        } catch(error) {
            console.log(error);
        }

        console.log(msg);
        myMessages.push(msg);
        socket.emit('text-event', myMessages);
        socket.broadcast.emit('text-event', myMessages);
 
    });
});