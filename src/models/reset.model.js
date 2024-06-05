const { log } = require('console');
const crypto = require('crypto');

//definición de métodos para resetear password


// const findUserByEmail = async (email) => {
//   const [rows] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);
//   return rows[0];
// };

const saveResetToken = async (email, token) => {
  await db.query('UPDATE usuario SET reset_password_token = ? WHERE email = ?', [token, email]);
  console.log("funcion modelo saveResetToken",email, token);

};


const findUserByToken = async (token) => {
  const [rows] = await db.query('SELECT * FROM usuario WHERE reset_password_token = ? AND reset_password_expires > ?', [token, Date.now()]);
  return rows[0];
};

const updatePassword = async (userId, hashedPassword) => {
  await db.query('UPDATE usuario SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedPassword, userId]);
};

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
  findUserByToken,
	updatePassword,
  generatePasswordToken
}
