// Importación de módulos propios
const Spent = require('../models/spent.model');
const Group = require('../models/group.model');


// Método para calcular las deudas de un grupo ("quién debe qué a quién")
const calculateNewDebts = async (data) => {
    
    const saldosUsers = [];
    const resultados = [];
    const pagador = [];
    const receptor = [];

    let i = 0;
    let j = 0;

    // Solicitamos el listado de usuarios del grupo
    const [ users ] = await Group.selectUsersByGroup(data.idGrupo);

    // Por cada usuario del grupo solicitamos sus saldo y lo almacenamos como objeto junto a los datos del usuario en array saldosUsers
    for(let user of users) {
        const [saldoUser] = await Spent.selectSaldo(data.idGrupo, user.idUsuario);
        saldosUsers.push({idUser: user.idUsuario, nameUser: user.nombre, saldo: saldoUser[0].saldo});
    }

    // En función del saldo de cada usuario construimos los arrays pagador (saldo negativo) y receptor (saldo positivo)
    for(let i of saldosUsers) {
        if(i.saldo < 0){
            pagador.push(i);
        }else{
            receptor.push(i);
        }
    } 

    // Bucle para ir calculando las deudas en función de los saldos de pagadores y receptores. Los resultamos se almacenan en array resultados
    while( i !== pagador.length && j !== receptor.length ){

        if ( pagador[i].saldo + receptor[j].saldo > 0 ){
            resultados.push({idGrupo: data.idGrupo, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: -pagador[i].saldo.toFixed(2)});
            receptor[j].saldo = pagador[i].saldo + receptor[j].saldo;
            i++;

        } else if ( pagador[i].saldo + receptor[j].saldo === 0 ){
            resultados.push({idGrupo: data.idGrupo, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: receptor[j].saldo.toFixed(2)});
            i++;
            j++; 

        } else {
            resultados.push({idGrupo: data.idGrupo, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: receptor[j].saldo.toFixed(2)});
            pagador[i].saldo = pagador[i].saldo + receptor[j].saldo;
            j++;
        }
    }

    // Devolvemos los resultados
    return(resultados);
};

//Exportamos el módulo
module.exports = {
    calculateNewDebts
}