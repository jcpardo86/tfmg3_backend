// Importación de módulos externos
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Importación de módulos propios
const resetModel = require('../models/reset.model');
const Mail = require('../helpers/email_utils');


// Definición de métodos para peticiones sobre restablecimiento de contraseña

const forgotPassword = async (req, res, next) => {

	//buscar usuario por email
	const { email } = req.body;

	try {
		const user = await resetModel.findUserByEmail(email);

		if (user[0].length === 0) {
			return res.status(404).send('No existe usuario con este email');
		}

		//generar random token y guardar en BBDD
		const resetToken = resetModel.generatePasswordToken();

		const savedToken = await resetModel.saveResetToken(email, resetToken);

		const resetUrl = `${req.protocol}://localhost:4200/reset/${resetToken}`;

		// Enviar email al usuario con URL para cambiar password
		await Mail.mailer(resetUrl, user[0][0], "reset_token" )

    	res.status(200).json({ success: true, message: 'Correo de restablecimiento enviado con éxito' });

	} catch (error) {
		next(error);
	}
};

const resetPassword = async (req, res, next) => {

	const resetToken = req.params.token;

	try{
		const user = await resetModel.findUserByResetToken(resetToken);

		if (user[0].length === 0) {
			return res.status(404).send('token no válido');
		} else {
			const newPassword = req.body.password;
			const confirmPassword = req.body.confirmPassword;

			if (newPassword !== confirmPassword) {
				return res.status(400).send('Las contraseñas no coinciden');
			} else {
				const changedPassword = resetModel.userNewPassword(user[0][0].idUsuario, newPassword);
			}

    		res.status(200).json({ success: true, message: 'contraseña cambiada con éxito' });

		}
	} catch(error) {
		next(error);
	}	
};

// Exportación de módulos
module.exports = {
  forgotPassword,
  resetPassword,
};
