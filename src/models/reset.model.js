const crypto = require('crypto');
const bcrypt = require('bcryptjs');

//definición de métodos para resetear password


const findUserByEmail = (email) => {
  return db.query(`SELECT * FROM usuario WHERE email = ?`, [email]);
};

const saveResetToken =  (email, token) => {
  return db.query('UPDATE usuario SET reset_password_token = ? WHERE email = ?', [token, email]);
};

const findUserByResetToken =  (token) => {
  return db.query('SELECT * FROM usuario WHERE reset_password_token = ? ', [token]);
};

const userNewPassword = (idUser, newPassword) => {
	const hashedPassword = bcrypt.hashSync(newPassword, 8);
  return db.query('UPDATE usuario SET password = ?, reset_password_token = NULL WHERE idUsuario = ?', [hashedPassword, idUser]);
};



//creacion de token para resetear password

const generatePasswordToken = () => {
    //Generamos un token aleatorio
    const resetToken = crypto.randomBytes(32).toString('hex');
    //encriptamos token
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    return hashedToken;
};


module.exports = {
  saveResetToken,
  findUserByResetToken,
	generatePasswordToken,
	findUserByEmail,
  userNewPassword
}
