
// Importación de módulo externo
const jwt = require('jsonwebtoken');

// Importación de módulo interno
const Group = require('../models/group.model');

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

const checkAdmin = async (req, res, next) =>{

    if (req.params.id_group !== undefined) {
        idGrupo = req.params.id_group;
    } else {
        idGrupo = req.body.idGrupo;
    }

    const [user] = await Group.selectUserGroup(req.user, idGrupo);
    console.log(user);

    if(user[0].rol !== "admin") {
        return res.status(403).json({ error: 'Sin acceso. Debes ser administrador del grupo' });
    }
    next();
}

// Exportación de módulos
module.exports = {
    checkToken,
    checkAdmin
}