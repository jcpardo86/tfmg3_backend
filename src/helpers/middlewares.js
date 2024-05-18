
// Importación de módulo externo
const jwt = require('jsonwebtoken');

// Importación de módulo interno
const User = require('../models/user.model');

// Definición middleware para validación de token
const checkToken = async (req, res, next) => {

    // Comprobamos si la petición lleva el token
    if(!req.headers['authorization']) {

        return res.status(403).json({ error: 'Debes incluir el token de autorización' });
    };

    // Comprobamos si el token es correcto

    const token = req.headers['authorization'];

    let payload; 

    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
    } catch(error) {
        return res.status(403).json({ error: error.message });
    }

    // Recuperaramos el identificador del usuario que realiza la petición y lo agregamos a la petición para poder usarlo en los handlers que siguen
    req.user = payload.id_user;

    next();

};

// Exportamos el módulo
module.exports = {
    checkToken,
}