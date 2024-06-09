
// Importación de módulo interno
const Group = require('../models/group.model');


// Definición de métodos para peticiones sobre grupos

const getGroupsByUser = async (req, res, next) => {
    try {
        const [ groups ] = await Group.selectGroupsByUser(req.params.id_user);
        res.json(groups);
    } catch(error) {
        next(error);
    };
};

const getGroupById = async (req, res, next) => {
    try {
        const [ group ] = await Group.selectGroupById(req.params.id_group);

        if(group.length === 0) {
            return res.status(404).json({ fatal: 'Grupo no encontrado' })
        }
        res.json(group[0]);
    } catch(error) {
        next(error);
    };
};

const getUsersByGroup = async (req, res, next) => {

    try {
        const [ users ] = await Group.selectUsersByGroup(req.params.id_group);
        res.json(users);
    } catch(error) {
        next(error);
    };
};

const getStatus = async (req, res, next) => {

    try {
        const [ status ] = await Group.selectStatus(req.params.id_group);
        res.json(status[0].estado);
    } catch(error) {
        next(error);
    };
};

// *****************revisar***************************
const createGroup = async (req, res, next) => {
    try {
        const [result] = await Group.insertGroup(req.body);
        res.json(result);
    } catch(error) {
        next(error);
    };
};

const addUserToGroup = async (req, res, next) => {
    try {
        const [result] = await Group.insertUserToGroup(req.body);
        res.json(result);
    } catch(error) {
        next(error);
    };
};

// ****************revisar****************************
const updateGroup = (req, res, next) => {
    const {id_group} = req.params; //destructuring: del objeto req.params quiero extraer el valor de la clave paciente_id y además almacenarlo en una variable llamadad paciente_id
    res.send(`Actualizamos el grupo ${ id_group }`);
};

const updateStatusGroup = async (req, res, next) => {
    const { id_group } = req.params;
    try {
        console.log(req.body);
        const [ result ] = await Group.updateStatus(parseInt(id_group), req.body.status);
        res.json(result);
    } catch(error) {
        next(error);
    };

}

const deleteGroup = async (req, res, next) => {
    const {id_group} = req.params; 
    try {
        const [ group ] = await Group.deleteGroup(id_group);
        res.json(group);
    } catch(error) {
        next(error);
    };
};


// Exportación de módulos
module.exports = {
    getGroupsByUser,
    getGroupById, 
    getUsersByGroup,
    createGroup,
    addUserToGroup,
    updateGroup,
    deleteGroup,
    updateStatusGroup,
    getStatus
}