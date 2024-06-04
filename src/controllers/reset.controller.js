// Importación de módulos propios
const resetModel = require('../models/reset.model');
const nodeMailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');




const requestPasswordReset = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await resetModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).send('No existe usuario con este email');
    }

    // Generar el token de restablecimiento de contraseña
    const saltRounds = 10; // Número de rondas de sal para generar el hash
    const token = await bcrypt.hash(email + Date.now(), saltRounds);


    await resetModel.saveResetToken(email, token);

    // const transporter = nodeMailer.createTransport({
    //   service: 'gmail',
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: 'lara.martin.lagares@gmail.com',
    //     pass: 'xnxk sbnc cdqn ayrp',
    //   },
    // });

    // transporter.sendMail(mailOptions, (err) => {
    //   if (err) {
    //     return res.status(500).send('Error al enviar el correo.');
    //   }
    //   res.status(200).send('Correo enviado.');
    // });

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
