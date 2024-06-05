// Importación de módulos propios
const Spent = require('../models/spent.model');
const Group = require('../models/group.model');


// Definición de métodos para peticiones sobre gastos

const getSpentsByGroup = async (req, res, next) => {
    try {
        const [ spents ] = await Spent.selectSpentsByGroup(req.params.id_group);
        res.json(spents);

    } catch(error) {
        next(error);
    };
};

const getSpentById = async (req, res, next) => {
    try {
        const [ spent ] = await Spent.selectSpentById(req.params.id_spent);
        res.json(spent[0]); 

    } catch(error) {
        next(error);
    };
};

/*const getSpentsByUser = async (req, res, next) => {
    try {
        const [ spents ] = await Spent.selectTotalSpentByUser(req.params.id_user);
        res.json(spents);

    } catch(error) {
        next(error);
    };

};*/

const createSpent = async (req, res, next) => {
    try {
        const [result] = await Spent.insertSpent(req.body);
        res.json(result);
    } catch(error) {
        next(error);
    };
};

const updateSpent =async (req, res, next) => {
    
    const {id_spent} = req.params;
    
    try {  
        const {result} = await  Spent.updateSpent(id_spent, req.body);
        const [[spent]] = await Spent.selectSpentById(id_spent);
  
        res.json(spent);
      
    } catch(error) {
        next(error);
      }
  };

const deleteSpent = async (req, res, next) => {
    
    const {id_spent}  = req.params;
   
    try {
        const[result] = await Spent.deleteSpentById(id_spent);

        if(result.affectedRows === 1 ) {
            res.json(result);

        } else {
           res.status(404).json({ message: 'El gasto no existe'});
        }
      
    } catch(error) {
        next(error);
    }
};

const getTotalSpentByGroup = async (req, res, next) => {
    try {
        const [ totalSpent ] = await Spent.selectTotalSpentByGroup(req.params.id_group);
        res.json(parseInt(totalSpent[0].total_importe));

    } catch(error) {
        next(error);
    };
};

const updateSaldo = async (req, res, next) => {
    try {
        const [spentTotalUser] = await Spent.selectTotalSpentByUser(req.body.idUsuario, req.body.idGrupo);
        if(!spentTotalUser[0].total_importe){
            spentTotalUser[0].total_importe = 0;
        }
        console.log (spentTotalUser);
        const [[porcentaje]] = await Spent.selectPorcentaje(req.body.idGrupo, req.body.idUsuario);
        console.log(porcentaje);
        const [[spentTotalGroup]] = await Spent.selectTotalSpentByGroup(req.body.idGrupo);
        const saldo = parseInt(spentTotalUser[0].total_importe) - parseInt(spentTotalGroup.total_importe) * parseInt(porcentaje.porcentaje)/100;
        const resultado = await Spent.updateSaldo(saldo, req.body);
        res.json(resultado);

    } catch(error) {
        next(error);
    }
};

// ********* Pendiente Optimizar *************
const getCuentas = async (req, res) => {
    let i = 0;
    let j = 0;

    let pagador = [];
    let receptor = [];
    let saldosUsers=[];
    let resultados=[];

    const [ users ] = await Group.selectUsersByGroup(req.params.id_group);
    console.log(users);

    for(let user of users) {
        //const [spentTotalUser] = await Spent.selectTotalSpentByUser(user.idUsuario, req.params.id_group);
        const [saldoUser] = await Spent.selectSaldo(req.params.id_group, user.idUsuario);
        console.log(saldoUser[0].saldo);
        saldosUsers.push({nameUser: user.nombre, saldo: saldoUser[0].saldo});
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
            resultados.push(`${pagador[i].nameUser} debe a ${receptor[j].nameUser} la cantidad de ${-pagador[i].saldo} €`);
            receptor[j].saldo = pagador[i].saldo + receptor[j].saldo;
            i++;

        } else if ( pagador[i].saldo + receptor[j].saldo === 0 ){
            resultados.push(`${pagador[i].nameUser} debe a ${receptor[j].nameUser} la cantidad de ${receptor[j].saldo} €`);
            i++;
            j++;

        } else {
            resultados.push(`${pagador[i].nameUser} debe a ${receptor[j].nameUser} la cantidad de ${receptor[j].saldo} €`);
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
    createSpent,
    getCuentas,
    updateSpent,
    deleteSpent,
    getSpentById,
    updateSaldo
}