// Importación de módulos propios
const Spents = require('../models/spent.model');
const Groups = require('../models/group.model');


// Definición de métodos para peticiones sobre gastos

const getSpentsByGroup = async (req, res) => {
    try {
        const [ spents ] = await Spents.selectSpentsByGroup(req.params.id_group);
        res.json(spents);

    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};

const getSpentsByUser = async (req, res) => {
    try {
        const [ spents ] = await Spents.selectTotalSpentByUser(req.params.id_user);
        res.json(spents);

    } catch(err) {
        res.status(500).json({ error: err.message });
    };

};

const createSpent = async (req, res) => {
    try {
        const [result] = await Spents.insertSpent(req.body);
        res.json(result);
    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};

const getTotalSpentByGroup = async (req, res) => {
    try {
        const [ totalSpent ] = await Spents.selectTotalSpentByGroup(req.params.id_group);
        res.json(totalSpent[0]);

    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};

// ********* Pendiente Optimizar *************
const getCuentas = async (req, res) => {
    let i = 0;
    let j = 0;

    let pagador = [];
    let receptor = [];
    let saldosUsers=[];
    let resultados=[];

    const [ users ] = await Groups.selectUsersByGroup(req.params.id_group);
    const [ spentGroup ] = await Spents.selectTotalSpentByGroup(req.params.id_group);

    for(let user of users) {
        const [spentUser] = await Spents.selectTotalSpentByUser(user.idUsuario, req.params.id_group);
        const saldo = spentUser[0].total_importe - spentGroup[0].total_importe/users.length;
        saldosUsers.push({idUser: user.idUsuario, saldo: saldo});
    }

    for(let i of saldosUsers) {
        if(i.saldo < 0){
            pagador.push(i);
        }else{
            receptor.push(i);
        }
    }  

    /*pagador.sort(function(a,b){
        return b.saldo - a.saldo
    })

    receptor.sort(function(a,b){
        return a.saldo - b.saldo;
    })*/

    while( i !== pagador.length && j !== receptor.length ){


        if ( pagador[i].saldo + receptor[j].saldo > 0 ){
            resultados.push(`el usuario ${pagador[i].idUser} debe al usuario ${receptor[j].idUser} la cantidad de ${-pagador[i].saldo}`);
            receptor[j].saldo = pagador[i].saldo + receptor[j].saldo;
            i++;

        } else if ( pagador[i].saldo + receptor[j].saldo === 0 ){
            resultados.push(`el usuario ${pagador[i].idUser} debe al usuario ${receptor[j].idUser} la cantidad de ${receptor[j].saldo}`);
            i++;
            j++;

        } else {
            resultados.push(`el usuario ${pagador[i].idUser} debe al usuario ${receptor[j].idUser} la cantidad de ${receptor[j].saldo}`);
            pagador[i].saldo = pagador[i].saldo + receptor[j].saldo;
            j++;
        }

    }

    res.json(resultados);
};


// Exportación de módulos
module.exports = {
    getSpentsByGroup,
    getTotalSpentByGroup,
    getSpentsByUser,
    createSpent,
    getCuentas, 
}