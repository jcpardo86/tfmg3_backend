// Importación de módulo externo
const nodemailer = require('nodemailer');

// Definición método para envío de mail a usuario

const mailer= ()=>{

    /*const sendGenericMail = (from, to, subject, text, html=None) => {
    const message = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html | "<p>Enhorabuena! Has creado correctamente tu cuenta en DIVI. Accede al siguiente enlace para Iniciar Sesión: http://localhost:4200/home</p>"
    };
}*/

    const message = {
        from: "lara.martin.lagares@gmail.com",
        to: "lara.martin.lagares@gmail.com",
        subject: "Bienvenido a DIVI",
        text: "Plaintext version of the message",
        html: "<p>Enhorabuena! Has creado correctamente tu cuenta en DIVI. Accede al siguiente enlace para Iniciar Sesión: http://localhost:4200/home</p>"
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