// Importación de módulo externo
const nodemailer = require('nodemailer');

// Definición método para envío de mail a usuario

const mailer= (destinatario, asunto, cuerpo)=>{

    const message = {
        from: "DIVI",
        to: destinatario,
        subject: asunto,
        text: "Plaintext version of the message",
        html: cuerpo
    };

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

    transporter.sendMail(message,  (error, info) => {
        if (error) {
            console.log("Error enviando email")
            console.log(error.message)
        } else {
            console.log("Email enviado")
        }
    });
};

// Exportación de módulo

module.exports = {
    mailer
}
