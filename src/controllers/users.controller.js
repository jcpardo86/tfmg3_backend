// Importación de módulo externo
const bcrypt = require('bcryptjs');

// Importación de módulos propios
const User = require('../models/user.model');
const Mail = require('../helpers/email_utils');
const { createToken } = require('../helpers/token_utils');


// Definición de métodos para peticiones sobre usuarios


const getUserById = async (req, res, next) => {

    try {
        const [ user ] = await User.selectUserById(req.params.id_user);
        
        if(user.length ===0) {
            return res.status(404).json({ fatal: 'Usuario no encontrado' });  
        }
        res.json(user[0]); 

    } catch(error) {
        next(error);
    };
};

const getUserByEmail = async (req, res, next) => {

    try {
        const [user] = await User.selectUserByEmail(req.params.email);
        res.json(user[0]); 

    } catch(error) {
        next(error);
    };
};

const getImageUser = async (req, res) => {

  const userId = req.params.id_user;

  if (!userId) {
	return res.status(400).json('Faltan datos requeridos');
  }

  const [image] = await User.selectImageUser(userId);

  if (!image) {
	return res.status(404).json('Imagen no encontrada');
  }

  res.json(image);

};

const userRegister = async (req, res, next) => {

    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8); 
        const [ result ]  = await User.insertUser(req.body);

        if (result.affectedRows !== 1) {
            return res.status(500).json({ error: 'Registro no correcto'});          
        }

        // Envío de mail informativo de registro al usuario
        const [user] = await User.selectUserByEmail(req.body.email);
        Mail.mailer(req.body, user[0], "new_register");

        res.json({ success: 'Registro correcto'});
        
    } catch(error) {
        next(error);
    }
}; 

const userLogin = async (req, res, next) => {

    try {

        // Comprobamos si el mail está en BBDD, lo que significa que el usuario existe
        const [users] = await User.selectUserByEmail(req.body.email);

        if (users.length === 0 ) {
            return res.status(401).json( {error: 'Error de acceso. El email y/o password introducido no es correcto'});
        }

        const user = users[0];

        // Comprobamos si la password es correcta (comparación password encriptada y sin encriptar)
        if(!bcrypt.compareSync(req.body.password, user.password)) { 
            return res.status(401).json( {error: 'Error de acceso. El email y/o password introducido no es correcto'});
        }
        res.json( { success: 'Login correcto', token: createToken(user), id_user: user.idUsuario});

    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {

    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8); 
        const [ response ] = await User.updateById(req.params.id_user, req.body);
        res.json(response);

    } catch (error) {
        next(error);
    }
};


// Exportación de módulos
module.exports = {
    getUserById,
    getUserByEmail,
    getImageUser,
    userRegister,
    userLogin, 
    updateUserById
}