// Importación de módulo externo
const nodemailer = require('nodemailer');

//Importación de módulos propios
const Group = require('../models/group.model');
const Debt = require('../models/debt.model');
const User = require('../models/user.model');


// Método para envío de mails a usuarios

const mailer= async (data, destinatario, option)=> {

    let asunto = "";
    let cuerpo = "";

    try {
        // Construimos el mensaje según la opción (nuevo gasto, nuevo registro, nuevo grupo, reset de contraseña)
        switch(option) {

            case "new_spent":
                asunto = "¡Nuevo gasto añadido a tu grupo en DIVI!";
                let cuerpo_1 = "";
                let cuerpo_2 = "";
                let cuerpo_3 = "";
                const [debts] = await Debt.selectDebtsByGroup(data.idGrupo);
                const [user] = await User.selectUserById(data.idUsuario);
                const [group] = await Group.selectGroupById(data.idGrupo);

                cuerpo_1 = 
                `<p style="font-size:1rem; font-weight:300;"> Hola ${destinatario.nombre}!<p> 
                <p style="font-size:1rem; font-weight:300;">Esperamos que te encuentres bien. Queremos informarte que se ha añadido un nuevo gasto a tu grupo de DIVI <span style="font-weight:500">"${group[0].nombre}".</span></p>
                <p style="font-size:1rem;"><strong>Detalles del nuevo gasto:<strong><p>
                <ul>
                    <li style="font-size:1rem; font-weight:300;"><span style="font-weight:500">Descripción:  </span>${data.descripcion}</li>
                    <li style="font-size:1rem; font-weight:300;"><span style="font-weight:500">Importe:  </span>${data.importe}</li>
                    <li style="font-size:1rem; font-weight:300;"><span style="font-weight:500">Fecha:  </span>${data.fecha}</li>
                    <li style="font-size:1rem; font-weight:300;"><span style="font-weight:500">Pagador: </span>${user[0].nombre}</li>
                </ul>
                <p style="font-size:1rem; font-weight:300;">A continuación, te compartimos el listado actualizado de deudas que están actualmente pendientes de pago en el grupo:</p>
                <ul>`;

                if(debts.length!==0) {
                    for(let i in debts) {
                        const [user_1] = await User.selectUserById(debts[i].idUsuario);
                        const [user_2] = await User.selectUserById(debts[i].receptor)
                        debts[i].nombre_usuario = user_1[0].nombre;
                        debts[i].nombre_receptor = user_2[0].nombre;
                        debts[i].nombre_grupo = group[0].nombre;
                    }
                    for (let debt of debts) {
                        if(debt.is_pagada===0) {
                            cuerpo_2 = cuerpo_2 + `<li style="font-size:1rem; font-weight:300;"><span style="font-weight:500">${debt.nombre_usuario}</span> debe a <span style="font-weight:500">${debt.nombre_receptor}</span> la cantidad de <span style="font-weight:500">${debt.importe} €</span></li>`;
                        } else {
                        cuerpo_2 = `<li style="font-size:1rem; font-weight:500;">No hay deudas pendientes</li>`
                        }
                    }
                } else {
                cuerpo_2 = `<li style="font-size:1rem; font-weight:500;">No hay deudas pendientes</li>`;
                }

                cuerpo_3 = 
                    `</ul>
                    <p style="font-size:1rem; font-weight:300;">Para ver más detalles o realizar alguna acción, por favor ingresa a tu cuenta en la aplicación DIVI.</p>
                    <p style="font-size:1rem; font-weight:300;">Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
                    <p style="font-size:1rem; font-weight:300;">¡Gracias por usar DIVI para compartir tus gastos!</p>
                    <p style="font-size:1rem; font-weight:300; margin-top:20px">Saludos,</p>
                    <p style="font-size:1rem; font-weight:300;">El equipo de DIVI</p>`
            
                cuerpo = cuerpo_1 + cuerpo_2 + cuerpo_3;
                
                break;
            
            case "new_register":
                asunto = "Bienvenido a DIVI";
                cuerpo = 
                        `<p>Hola ${destinatario.nombre}!</p>
                        <p>Has creado correctamente tu cuenta en DIVI. Accede al siguiente enlace para Iniciar Sesión: http://localhost:4200/home</p>
                        <p style="margin-top:20px">¡Gracias por usar DIVI para compartir tus gastos!</p>
                        <p>Saludos,</p>
                        <p>El equipo de DIVI</p>`;
                break;

            case "reset_token":
                asunto = "Recuperación de contraseña";
                cuerpo = `
                    <p>Hola ${destinatario.nombre}!</p>
                    <p>Para cambiar tu contraseña de acceso a DIVI, pincha en el siguiente link:</p> <br><a href="${data}">${data}</a>
                    <p style="margin-top:20px">¡Gracias por usar DIVI para compartir tus gastos!</p>
                    <p>Saludos,</p>
                    <p>El equipo de DIVI</p>`;

                break;

            case "new_group":
                const grupo = await this.groupService.selectGroupById(data.idGrupo);
                asunto = "Nuevo grupo en DIVI!";
                cuerpo = `
                    <p style="font-size:1rem; font-weight:300;">Hola ${destinatario.nombre}!</p>
                    <p style="font-size:1rem; font-weight:300;">Esperamos que te encuentres bien.</p>
                    <p style="font-size:1rem; font-weight:300;">Nos complace informarte que has sido añadido a un nuevo grupo en la aplicación DIVI para compartir gastos. Este grupo ha sido creado para facilitar la gestión de los gastos comunes de manera sencilla y eficiente.</p>
                    <p style="font-size:1rem; font-weight:500">Detalles del grupo:<p>
                    <ul>
                        <li style="font-size:1rem; font-weight:300;">Nombre del grupo: ${grupo.nombre}</li>
                        <li style="font-size:1rem; font-weight:300;">Descripción: ${grupo.descripcion}</li>
                    </ul>
                    <p style="font-size:1rem; font-weight:500"">¿Cómo empezar?:<p>
                    <ol>
                        <li style="font-size:1rem; font-weight:300;">Inicia sesión en tu cuenta de DIVI.</li>
                        <li style="font-size:1rem; font-weight:300;">Selecciona en tu listado de grupos el grupo "${data.idGrupo}"</li>
                        <li style="font-size:1rem; font-weight:300;">Explora las funcionalidades y comienza a gestionar los gastos con tus compañeros.</li>
                    </ol>
                    <p style="font-size:1rem; font-weight:300;">Si tienes alguna pregunta o necesitas ayuda para comenzar, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                    <p style="font-size:1rem; font-weight:300;">¡Estamos seguros de que encontrarás DIVI muy útil para simplificar la gestión de tus gastos compartidos!</p>
                    <p style="font-size:1rem; font-weight:300;">Saludos,</p>
                    <p style="font-size:1rem; font-weight:300;">El equipo de DIVI</p>`;
                
                    break;
        }
    } catch (error) {
        next(error);
    }


    const message = {
        from: "DIVI",
        to: destinatario.email,
        subject: asunto,
        text: "Plaintext version of the message",
        html: cuerpo
    };

    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log("Error enviando email")
            console.log(error.message)
        } else {
            console.log("Email enviado")
        }
    });

    return ("Respuesta: El mensaje ha sido enviado");

};

// Exportación de módulo
module.exports = {
    mailer
}
