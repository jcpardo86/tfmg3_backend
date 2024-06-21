// Importación de módulos propios
const Spent = require('../models/spent.model');


// Definición de métodos para peticiones sobre gestión de gastos

//Método para obtener todos los gastos de un grupo a partir de su id de grupo
const getSpentsByGroup = async (req, res, next) => {
    try {
        const [ spents ] = await Spent.selectSpentsByGroup(req.params.id_group);
        res.json(spents);
    } catch(error) {
        next(error);
    };
};

//Método para obtener los datos de un gasto a partir de su id de gasto
const getSpentById = async (req, res, next) => {
    try {
        const [ spent ] = await Spent.selectSpentById(req.params.id_spent);
        res.json(spent[0]); 
    } catch(error) {
        next(error);
    };
};

//Método para obtener el gasto total de un grupo a partir de su id de grupo
const getTotalSpentByGroup = async (req, res, next) => {
    try {
        const [ totalSpent ] = await Spent.selectTotalSpentByGroup(req.params.id_group);
        res.json(Number(Number(totalSpent[0].total_importe).toFixed(2)));
    } catch(error) {
        next(error);
    };
};

//Método para insertar un gasto
const createSpent = async (req, res, next) => {
    try {
        const [result] = await Spent.insertSpent(req.body);
        res.json(result);
    } catch(error) {
        next(error);
    };
};

//Método para actualizar los datos de un gasto
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

//Método para actualizar el saldo de un usuario cuando se añade/modifica un gasto o cuando se paga una deuda
const updateSaldo = async (req, res, next) => {
    try {
        const [spentTotalUser] = await Spent.selectTotalSpentByUser(req.body.idUsuario, req.body.idGrupo);
        if(!spentTotalUser[0].total_importe){
            spentTotalUser[0].total_importe = 0;
        }

        // El nuevo saldo se calcula a partir del porcentaje de gasto, el gasto total del grupo y el importe ya liquidado por el usuario.
        const [[porcentaje]] = await Spent.selectPorcentaje(req.body.idGrupo, req.body.idUsuario);
        const [[spentTotalGroup]] = await Spent.selectTotalSpentByGroup(req.body.idGrupo); 
        const [liquidado] = await Spent.selectLiquidado(req.body.idUsuario, req.body.idGrupo);
        const saldo = Number(Number(spentTotalUser[0].total_importe).toFixed(2)) - (Number(Number(spentTotalGroup.total_importe).toFixed(2))) * Number(Number((porcentaje.porcentaje)/100).toFixed(2)) + liquidado[0].importe_liquidado;
        const resultado = await Spent.updateSaldo(saldo, req.body);
        res.json(resultado);
    } catch(error) {
        next(error);
    }
};

//Método para actualizar el importe que ya ha liquidado (saldado) un usuario cuando se paga una deuda
const updateImporteLiquidado = async (req, res, next) => {
    try {
        //Para pagador: solicitamos el valor de importe liquidado de BBDD, lo actualizamos y lo guardamos
        const [resultado_1] = await Spent.selectLiquidado(req.body.idUsuario, req.body.idGrupo);
        const liquidadoPagador = resultado_1[0].importe_liquidado + req.body.importe;
        const [resultado_2] = await Spent.updateLiquidado(req.body.idUsuario, req.body.idGrupo, liquidadoPagador);
        
        //Para receptor: solicitamos el valor de importe liquidado de BBDD, lo actualizamos y lo guardamos
        const [resultado_3] = await Spent.selectLiquidado(req.body.receptor, req.body.idGrupo)
        const liquidadoReceptor = resultado_3[0].importe_liquidado - req.body.importe;
        const [resultado_4] = await Spent.updateLiquidado(req.body.receptor, req.body.idGrupo, liquidadoReceptor)

        return res.json({message: 'registro correcto de importe liquidado'});
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


// Exportación de módulos
module.exports = {
    getSpentsByGroup,
    getTotalSpentByGroup,
    createSpent,
    updateSpent,
    deleteSpent,
    getSpentById,
    updateSaldo,
    updateImporteLiquidado,
}