// Importación de módulos propios
const resetModel = require('../models/reset.model');
const nodeMailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await resetModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).send('No existe usuario con este email');
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expiration = Date.now() + 3600000; // token válido por 1 hora

    await resetModel.saveResetToken(email, token, expiration);

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'lara.martin.lagares@gmail.com',
        pass: 'xnxk sbnc cdqn ayrp',
      },
    });

    const mailOptions = {
      to: email,
      from: 'no-reply@tuapp.com',
      subject: 'Restablecimiento de contraseña',
      text: `Recibiste este correo porque has solicitado restablecer la contraseña de tu cuenta.\n\n
      Haz clic en el siguiente enlace, o cópialo y pégalo en tu navegador para completar el proceso:\n\n
      http://localhost:4200/reset-password/${token}\n\n
	  \n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return res.status(500).send('Error al enviar el correo.');
      }
      res.status(200).send('Correo enviado.');
    });

  } catch (error) {
    res.status(500).send('Error al procesar la solicitud.');
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await resetModel.findUserByToken(token);
    if (!user || user.reset_password_expires < Date.now()) {
      return res.status(400).send('El token de recuperación es inválido o ha caducado.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await resetModel.updatePassword(user.id, hashedPassword);

    res.status(200).send('Contraseña restablecida con éxito.');
  } catch (error) {
    res.status(500).send('Error al restablecer la contraseña.');
  }
};


module.exports = {
	requestPasswordReset,
	resetPassword,
};
