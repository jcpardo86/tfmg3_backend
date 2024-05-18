// Importación de módulo externo
const bcrypt = require('bcryptjs');

// Importación de módulos propios
const User = require('../models/user.model');
const Mail = require('../helpers/email_utils')
const { createToken } = require('../helpers/utils');



// Definición de métodos para peticiones sobre usuarios

const userRegister = async (req, res, next) => {

    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8); 
        const [ result ]  = await User.insertUser(req.body);

        if (result.affectedRows !== 1) {
            return res.status(500).json({ error: 'Registro no correcto'});          
        }

        Mail.mailer();

        res.json({ success: 'Registro correcto'});
        
    } catch(err) {
        next(err);
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
        

    } catch (err) {
        next(err);
    }
};



const getUserById = async (req, res) => {

    try {
        const [ user ] = await User.selectUserById(req.params.id_user);
        
        if(user.length ===0) {
            return res.status(404).json({ fatal: 'Usuario no encontrado' });
           
        }
        res.json(user[0]); 

    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};


// Exportación de módulos
module.exports = {
    userRegister,
    userLogin, 
    getUserById
}