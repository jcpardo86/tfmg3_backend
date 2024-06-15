// Importación de módulo externo
const nodemailer = require('nodemailer');

//Importación de módulos propios
const Group = require('../models/group.model');
const Debt = require('../models/debt.model');
const User = require('../models/user.model');


// Definición método para envío de mail a usuario

const mailer= async (data, destinatario, option)=> {

    let asunto = "";
    let cuerpo = "";

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
             <p style="font-size:1rem; font-weight:300;">Esperamos que te encuentres bien. Queremos informarte que se ha añadido un nuevo gasto a tu grupo de DIVI "${group.nombre_grupo}"</p>
             <p style="font-size:1rem; font-weight:300;"><strong>Detalles del nuevo gasto:<strong><p>
             <ul>
               <li style="font-size:1rem; font-weight:300;"><strong>Descripción:  </strong>${data.descripcion}</li>
               <li style="font-size:1rem; font-weight:300;"><strong>Importe:  </strong>${data.importe}</li>
               <li style="font-size:1rem; font-weight:300;"><strong>Fecha:  </strong>${data.fecha}</li>
               <li style="font-size:1rem; font-weight:300;"><strong>Pagador: </strong>${user[0].nombre}</li>
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
                        cuerpo_2 = cuerpo_2 + `<li style="font-size:1rem; font-weight:300;">${debt.nombre_usuario} debe a ${debt.nombre_receptor} la cantidad de ${debt.importe} €</li>`;
                    } else {
                        cuerpo_2 = `<li style="font-size:1rem; font-weight:300;">No hay deudas pendientes</li>`
                    }
                }
            } else {
                cuerpo_2 = `<li style="font-size:1rem; font-weight:300;">No hay deudas pendientes</li>`;
            }

            cuerpo_3 = 
                `</ul>
                <p style="font-size:1rem; font-weight:300;">Para ver más detalles o realizar alguna acción, por favor ingresa a tu cuenta en la aplicación DIVI.</p>
                <p style="font-size:1rem; font-weight:300;">Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
                <p style="font-size:1rem; font-weight:300;">¡Gracias por usar DIVI para compartir tus gastos!</p>
                <p style="font-size:1rem; font-weight:300;">Saludos,</p>
                <p style="font-size:1rem; font-weight:300;">El equipo de DIVI</p>`
            
            cuerpo = cuerpo_1 + cuerpo_2 + cuerpo_3;
            console.log(cuerpo);
            break;
            

        case "new_register":
            asunto = "Bienvenido a DIVI";
            cuerpo = 
                    `<p>Enhorabuena ${destinatario.nombre}!</p>
                    <p>Has creado correctamente tu cuenta en DIVI. Accede al siguiente enlace para Iniciar Sesión: http://localhost:4200/home</p>
                    <p>¡Gracias por usar DIVI para compartir tus gastos!</p>
                    <p>Saludos,</p>
                    <p>El equipo de DIVI</p>`;
            break;


        case "reset_token":
            asunto = "Recuperación de contraseña";
            cuerpo = `
                    <p>Hola ${destinatario.nombre}!</p>
                    <p>Para cambiar tu contraseña de acceso a DIVI, pincha en el siguiente link:</p> <br><a href="${data}">${data}</a>
                    <p>¡Gracias por usar DIVI para compartir tus gastos!</p>
                    <p>Saludos,</p>
                    <p>El equipo de DIVI</p>`;
            break;
    
    }
            

    const message = {
        from: "DIVI",
        to: destinatario.email,
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

    return ("Respuesta: El mensaje ha sido enviado");

};

// Exportación de módulo
module.exports = {
    mailer
}
