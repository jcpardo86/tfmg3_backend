// Importación de módulos propios
const Spent = require('../models/spent.model');
const Debt = require('../models/debt.model')
const Group = require('../models/group.model');
const User = require('../models/user.model');


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
        const [[porcentaje]] = await Spent.selectPorcentaje(req.body.idGrupo, req.body.idUsuario);
        const [[spentTotalGroup]] = await Spent.selectTotalSpentByGroup(req.body.idGrupo); 
       // if(!spentTotalGroup.total_importe){
       //     spentTotalGroup.total_importe = 0;
       // }
        const [liquidado] = await Spent.selectLiquidado(req.body.idUsuario, req.body.idGrupo);
        const saldo = parseInt(spentTotalUser[0].total_importe) - parseInt(spentTotalGroup.total_importe) * parseInt(porcentaje.porcentaje)/100 + liquidado[0].importe_liquidado;
        const resultado = await Spent.updateSaldo(saldo, req.body);
        res.json(resultado);

    } catch(error) {
        next(error);
    }
};

const updateImporteLiquidado = async (req, res, next) => {
    try {
       // const [resultado_8] = await Spent.selectDeudaSaldada(req.body.idPagador, req.body.idGrupo);
        //if(resultado_8[0].deuda_saldada === "true") {
           // return res.json({ liquidado: true });
        //}

        const [resultado_1] = await Spent.selectLiquidado(req.body.idUsuario, req.body.idGrupo);
        const liquidadoPagador = resultado_1[0].importe_liquidado + req.body.importe;
        const [resultado_2] = await Spent.updateLiquidado(req.body.idUsuario, req.body.idGrupo, liquidadoPagador);
        const [resultado_3] = await Spent.selectLiquidado(req.body.receptor, req.body.idGrupo)
        const liquidadoReceptor = resultado_3[0].importe_liquidado - req.body.importe;
        const [resultado_4] = await Spent.updateLiquidado(req.body.receptor, req.body.idGrupo, liquidadoReceptor)

       // if(resultado_5[0].saldo === -resultado_6[0].importe_liquidado) {
           // const [resultado_7] = await Spent.updateDeudaSaldada(req.body.idPagador, req.body.idGrupo);
           // return res.json({liquidado: true});
        //}
        return res.json({message: 'registro correcto de importe liquidado'});

    } catch(error) {
        next(error);
    }
};


// ********* Pendiente Optimizar *************
/*const getCuentas = async (req, res) => {
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
            resultados.push({idGrupo: req.params.id_group, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: -pagador[i].saldo});
            receptor[j].saldo = pagador[i].saldo + receptor[j].saldo;
            i++;

        } else if ( pagador[i].saldo + receptor[j].saldo === 0 ){
            resultados.push({idGrupo: req.params.id_group, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: receptor[j].saldo});
            i++;
            j++;

        } else {
            resultados.push({idGrupo: req.params.id_group, idPagador: pagador[i].idUser, namePagador: pagador[i].nameUser, idReceptor: receptor[j].idUser, nameReceptor: receptor[j].nameUser, importe: receptor[j].saldo});
            pagador[i].saldo = pagador[i].saldo + receptor[j].saldo;
            j++;
        }

    }
   // for(let i = 0; i < resultados.length; i++) {
     //   const [liquidado] = await Spent.selectDeudaSaldada(resultados[i].idPagador, resultados[i].idGrupo);
       // resultados[i].liquidado = liquidado[0].deuda_saldada;
       // console.log(resultados[i].liquidado);
    // }
    console.log(resultados);
    res.json(resultados);
};*/


// Exportación de módulos
module.exports = {
    getSpentsByGroup,
    getTotalSpentByGroup,
    createSpent,
    //getCuentas,
    updateSpent,
    deleteSpent,
    getSpentById,
    updateSaldo,
    updateImporteLiquidado,
}