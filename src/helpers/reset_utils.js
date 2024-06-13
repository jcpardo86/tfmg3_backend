const nodemailer = require('nodemailer');

const sendRecoveryEmail = (email, resetToken, resetUrl) => {
  console.log("entra en send email");
  console.log("Email:", email);
  console.log("Reset Token:", resetToken);
  console.log("Reset URL:", resetUrl);

  const message = {
    from: "Divi support <no-reply@divi.com>",
    to: email,
    subject: "Recuperación de contraseña",
    text: "Plaintext version of the message",
    html: `<h2>Pincha en el link para recuperar tu contraseña</h2> <br><a href="${resetUrl}">${resetUrl}</a>`
  };

	console.log("Message:", message);

	    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'lara.martin.lagares@gmail.com',
            pass: 'xnxk sbnc cdqn ayrp'
        }
    });


//   const transporter = nodemailer.createTransport({
//     host: 'sandbox.smtp.mailtrap.io',
//     port: 2525,
//     secure: false,
//     auth: {
//       user: 'cb8e8ab494f2ec',
//       pass: 'cdfaa1536bb3d3'
//     }
// 	  });

// 	  const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: 'process.env.EMAIL_PASS'
//     }
//   });


  console.log("Transporter creado");

  // Enviar el email
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Error enviando email:");
      console.log(error.message);
    } else {
      console.log("Email enviado:", info.response);
    }
  });

  console.log("Transporte mail enviado función");
};

module.exports = {
  sendRecoveryEmail,
};
