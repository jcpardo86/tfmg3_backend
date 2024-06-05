// Importación de módulos propios
const { sendRecoveryEmail } = require('../helpers/reset_utils');
const resetModel = require('../models/reset.model');
// const tokenUtils = require('../helpers/token_utils');
// const nodeMailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { log } = require('console');
const { userRegister } = require('./users.controller');




const forgotPassword = async (req, res, next) => {
	//buscar usuario por email
	const { email } = req.body;
	// log("email en forgot password", email);


	try {
		log("email en try", email);

		const user = await resetModel.findUserByEmail(email);
		log("usuario encontrado", user);

		if (user[0].length === 0) {
			return res.status(404).send('No existe usuario con este email');
		}

		//generar random token

	const resetToken = resetModel.generatePasswordToken();
	// console.log("nuevo token creado", resetToken, email);

		const savedToken = await resetModel.saveResetToken(email, resetToken);

		const resetUrl = `${req.protocol}://${req.get('host')}/api/reset/${resetToken}`;


		const sendMail = await sendRecoveryEmail(email, resetToken,resetUrl);


		// console.log("usuario con nuevo token password guardado",user);


		//¡enviar email con token!
		// const resetUrl = `${req.protocol}://${req.get('host')}/api/reset/${resetToken}`;


		// const message = `Has olvidado tu contraseña? Entra en el siguiente enlace para restablecerla: \n\n${resetUrl}\n\nSi no has solicitado este cambio, por favor ignora este mensaje.`;
		// try {
		// 	console.log("entra en try de enviar email");
		// 			await sendRecoveryEmail({
		// 				subject: 'Recuperación de contraseña',
		// 				message: message,
		// 			})
		// 	log("email enviado");

		// 	res.status(200).send('Token enviado al mail con éxito.');

		// } catch (error) {
		// // user.password_reset_token = undefined;

		// 	return next(new CustomError('No se ha podido enviar el email', 500));

		// }
		res.status(200).send('Token enviado al mail con éxito.');

} catch (error) {
		res.status(500).send('Error al procesar la solicitud.');
	}
}









const resetPassword = async (req, res, next) => {

	console.log("entra en reset password");

	console.log(req.params);

	const resetToken = req.params.token;

	console.log("token", resetToken);

	const user = await resetModel.findUserByResetToken(resetToken);
	if (!user) {
			return res.status(404).send('token no válido');
	}

console.log(user);

	const newPassword = req.body.password;
	const confirmPassword = req.body.confirmPassword;



	if (newPassword !== confirmPassword) {
		return res.status(400).send('Las contraseñas no coinciden');
	} else {
		console.log("id de usuario  antes de entrar a user new password",user[0][0].idUsuario);


		const changedPassword = resetModel.userNewPassword(user[0][0].idUsuario, newPassword);

		console.log("usuario con la contrraseña cambiada", user[0][0]);

		res.status(200).send('Contraseña actualizada con éxito');
	}

	console.log(user);
}



module.exports = {
  forgotPassword,
  resetPassword,
};
