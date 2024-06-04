//definición de métodos para resetear password


const findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);
  return rows[0];
};

const saveResetToken = async (email, token) => {
  console.log(email, token);
  await db.query('UPDATE usuario SET reset_password_token = ? WHERE email = ?', [token, email]);
};


const findUserByToken = async (token) => {
  const [rows] = await db.query('SELECT * FROM usuario WHERE reset_password_token = ? AND reset_password_expires > ?', [token, Date.now()]);
  return rows[0];
};

const updatePassword = async (userId, hashedPassword) => {
  await db.query('UPDATE usuario SET password = ?, reset_password_token = NULL, reset_password_expires = NULL WHERE id = ?', [hashedPassword, userId]);
};

module.exports = {
	  findUserByEmail,
  saveResetToken,
  findUserByToken,
  updatePassword,
}
