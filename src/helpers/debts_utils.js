// Importación de módulos propios
const Spent = require('../models/spent.model');
const Group = require('../models/group.model');


const calculateNewDebts = async (data) => {
    
    const saldosUsers = [];
    const resultados = [];
    const pagador = [];
    const receptor = [];

    let i = 0;
    let j = 0;

    const [ users ] = await Group.selectUsersByGroup(data.idGrupo);

    for(let user of users) {
        const [saldoUser] = await Spent.selectSaldo(data.idGrupo, user.idUsuario);
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
            resultados.push({idGrupo: data.idGrupo, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: -pagador[i].saldo});
            receptor[j].saldo = pagador[i].saldo + receptor[j].saldo;
            i++;

        } else if ( pagador[i].saldo + receptor[j].saldo === 0 ){
            resultados.push({idGrupo: data.idGrupo, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: receptor[j].saldo});
            i++;
            j++; 

        } else {
            resultados.push({idGrupo: data.idGrupo, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: receptor[j].saldo});
            pagador[i].saldo = pagador[i].saldo + receptor[j].saldo;
            j++;
        }
    }

    return(resultados);
};

module.exports = {
    calculateNewDebts
}