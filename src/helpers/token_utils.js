
// Importación de módulos externos
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');


// Definición middleware para generación de token

const createToken = (user)=> {
    const payload = {
        id_user: user.idUsuario,
        exp: dayjs().add(1440, 'minutes').unix(), // Fecha de caducidad al login (24h)
    }
    return jwt.sign(payload, process.env.SECRET_KEY);  //Codificamos el payload para generar el token
};


// Exportamos el módulo
module.exports = {
	createToken,
}
