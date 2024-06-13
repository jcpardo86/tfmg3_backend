// Importación de módulos internos

const Group = require('../models/group.model');
const Spent = require('../models/spent.model');
const Debt = require('../models/debt.model');
const User = require('../models/user.model');

// Definición de métodos para peticiones sobre deudas

const updateDebtsByGroup = async (req, res, next) => {

    let i = 0;
    let j = 0;

    let pagador = [];
    let receptor = [];
    let saldosUsers=[];
    let resultados=[];

    const [ users ] = await Group.selectUsersByGroup(req.body.idGrupo);

    for(let user of users) {
        //const [spentTotalUser] = await Spent.selectTotalSpentByUser(user.idUsuario, req.params.id_group);
        const [saldoUser] = await Spent.selectSaldo(req.body.idGrupo, user.idUsuario);
        saldosUsers.push({idUser: user.idUsuario, nameUser: user.nombre, saldo: saldoUser[0].saldo});
    }

    for(let i of saldosUsers) {
        if(i.saldo < 0){
            pagador.push(i);
        }else{
            receptor.push(i);
        }
    } 

    while( i !== pagador.length && j !== receptor.length ){

        if ( pagador[i].saldo + receptor[j].saldo > 0 ){
            resultados.push({idGrupo: req.body.idGrupo, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: -pagador[i].saldo});
            receptor[j].saldo = pagador[i].saldo + receptor[j].saldo;
            i++;

        } else if ( pagador[i].saldo + receptor[j].saldo === 0 ){
            resultados.push({idGrupo: req.body.idGrupo, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: receptor[j].saldo});
            i++;
            j++; 

        } else {
            resultados.push({idGrupo: req.body.idGrupo, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: receptor[j].saldo});
            pagador[i].saldo = pagador[i].saldo + receptor[j].saldo;
            j++;
        }
    }

    const arrIdUpdated = [];
    for(let resultado of resultados) {
        const [id_debt] = await Debt.selectDebt(req.body.idGrupo, resultado.idPagador, resultado.idReceptor);
        if (id_debt.length>0 && id_debt[0].is_pagada!==1) {
           const  update = await Debt.updateDebtById(id_debt[0].idDeuda, resultado.importe);
            arrIdUpdated.push(id_debt[0].idDeuda);
        }
    }

    const [debts] = await Debt.selectDebtsByGroup(req.body.idGrupo);
    for(let i = 0; i<debts.length; i++) {
        let borrar = 1; 
        for(let id of arrIdUpdated) {
            if (debts[i].idDeuda !== id && debts[i].is_pagada !== 1) {
                console.log ("estoy aquí", debts[i].idDeuda)
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

    for(let resultado of resultados) {
        const [id_debt] = await Debt.selectDebt(req.body.idGrupo, resultado.idPagador, resultado.idReceptor);
        console.log("id_debt", id_debt);
        if (id_debt.length===0 || id_debt[0].is_pagada ===1) {
         await Debt.insertDebt(resultado);
        }
    }
    res.json(resultados);
};

const getDebtsByGroup = async (req, res, next) => {
        const { id_group } = req.params;
    try {
        const [group] = await Group.selectGroupById(id_group);
        const [debts] = await Debt.selectDebtsByGroup(id_group);

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
}

const updateStatus = async (req, res, next) => {
    try {
        const [resultado] = await Debt.updateStatus(req.body.idDeuda, 1);
        res.json(resultado);
    } catch(error) {
        next(error);
    }
}

// Exportación de módulos
module.exports = {
   updateDebtsByGroup,
   getDebtsByGroup,
   updateStatus
}

