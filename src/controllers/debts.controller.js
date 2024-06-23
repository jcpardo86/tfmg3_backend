// Importación de módulos internos
const Group = require('../models/group.model');
const Debt = require('../models/debt.model');
const User = require('../models/user.model');
const Mail = require('../helpers/email_utils');
const NewDebts = require('../helpers/debts_utils');


// Definición de métodos para peticiones sobre deudas

//Método para obtener el listado de deudas de un grupo a partir de su id de grupo
const getDebtsByGroup = async (req, res, next) => {
    const { id_group } = req.params;
    try {
        const [group] = await Group.selectGroupById(id_group);
        const [debts] = await Debt.selectDebtsByGroup(id_group);

        // Añadimos por cada deuda recibida de bbdd las propiedades nombre_usuario (pagador), nombre_receptor y nombre_grupo
        for(let i in debts) {
            const [user_1] = await User.selectUserById(debts[i].idUsuario);
            const [user_2] = await User.selectUserById(debts[i].receptor)
            debts[i].nombre_usuario = user_1[0].nombre;
            debts[i].nombre_receptor = user_2[0].nombre;
            debts[i].nombre_grupo = group[0].nombre;
        }

        res.json(debts);

    } catch(error) {
            next(error);
    }
};

//Método para actualizar el listado (no pagadas) de un grupo
const updateDebtsByGroup = async (req, res, next) => {

    const arrIdUpdated = [];

    try {
        // Llamada a método para obtener el listado de deudas actualizado
        const resultados = await NewDebts.calculateNewDebts(req.body);

        // Si ya existe en BBDD una deuda para mismo pagador y receptor que no está pagada, entonces actualizamos su importe
        for(let resultado of resultados) {
            const [id_debt] = await Debt.selectDebt(req.body.idGrupo, resultado.idPagador, resultado.idReceptor);
            if (id_debt.length>0 && id_debt[0].is_pagada!==1) {
                const  update = await Debt.updateDebtById(id_debt[0].idDeuda, resultado.importe);
                arrIdUpdated.push(id_debt[0].idDeuda);
            }
        }

        // Las deudas de BBDD que no han sido actualizadas en el bucle anterior y que no están pagadas, las eliminamos
        const [debts] = await Debt.selectDebtsByGroup(req.body.idGrupo);
        for(let i = 0; i<debts.length; i++) {
            let borrar = 1; 
            for(let id of arrIdUpdated) {
                if (debts[i].idDeuda !== id && debts[i].is_pagada !== 1) {
                    borrar = 1; 
                } else {
                    borrar = 0; 
                    break;
                } 
            }
            if(borrar===1) {
            await Debt.deleteDebtById(debts[i].idDeuda);
            }
        }

        // Si no existía ya deuda en BBDD para mismo pagador y receptor, entonces la insertamos
        for(let resultado of resultados) {
            const [id_debt] = await Debt.selectDebt(req.body.idGrupo, resultado.idPagador, resultado.idReceptor);
            if (id_debt.length===0 || id_debt[0].is_pagada ===1) {
            await Debt.insertDebt(resultado);
            }
        }

        // Enviamos mail a todos los miembros del grupo con la información del gasto añadido/actualizado y el listado de deudas del grupo pendientes de pago.
        const [ users ] = await Group.selectUsersByGroup(req.body.idGrupo);
        for(let user of users) {
            await Mail.mailer(req.body, user, "new_spent");
        }

        res.json(resultados);

    } catch (error) {
        next(error);
    }
};

//Método para pasar a estado pagada una deuda --> (is_pagada = 1) 

const updateStatus = async (req, res, next) => {
    try {
        const [resultado] = await Debt.updateStatus(req.body.idDeuda, 1);
        res.json(resultado);
    } catch(error) {
        next(error);
    }
};


// Exportación de módulos
module.exports = {
    getDebtsByGroup,
    updateDebtsByGroup,
    updateStatus
};

