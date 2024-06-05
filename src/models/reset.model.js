const { log } = require('console');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

//definición de métodos para resetear password


const findUserByEmail = (email) => {
        return db.query(`SELECT * FROM usuario WHERE email = ?`, [email]);
};

const saveResetToken =  (email, token) => {
   db.query('UPDATE usuario SET reset_password_token = ? WHERE email = ?', [token, email]);
//   console.log("funcion modelo saveResetToken",email, token);

};


const findUserByResetToken =  (token) => {
 return db.query('SELECT * FROM usuario WHERE reset_password_token = ? ', [token]);
};

// const updatePassword = async (userId, hashedPassword) => {
//   await db.query('UPDATE usuario SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedPassword, userId]);
// };

const userNewPassword = (idUser, newPassword) => {

	console.log(idUser, newPassword);
	const hashedPassword = bcrypt.hashSync(newPassword, 8);

	console.log("password encriptado", hashedPassword);
  	return db.query('UPDATE usuario SET password = ?, reset_password_token = NULL WHERE idUsuario = ?', [hashedPassword, idUser]);
};


// const userNewPassword = (idUser, newPassword) => {

// 	newPassword = bcrypt.hashSync(newPassword, 8);
// 	db.query('UPDATE usuario SET password = ?, reset_password_token = NULL WHERE id = ?', [idUser, newPassword]);

// }

//creacion de token para resetear password

const generatePasswordToken = () => {
    //Generamos un token aleatorio
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log("token generado", resetToken);
    //encriptamos token
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    console.log("token encriptado", hashedToken);
    return hashedToken;
}


module.exports = {
	//   findUserByEmail,
  saveResetToken,
  findUserByResetToken,
	// updatePassword,
	generatePasswordToken,
	findUserByEmail,
  userNewPassword
}
