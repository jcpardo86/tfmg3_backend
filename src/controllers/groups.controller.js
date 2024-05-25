
// Importación de módulo interno
const Grupos = require('../models/group.model');


// Definición de métodos para peticiones sobre grupos

const getGroupsByUser = async (req, res) => {
    try {
        const [ groups ] = await Grupos.selectGroupsByUser(req.params.id_user);
        res.json(groups);
    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};

const getGroupById = async (req, res) => {
    try {
        const [ group ] = await Grupos.selectGroupById(req.params.id_group);

        if(group.length === 0) {
            return res.status(404).json({ fatal: 'Grupo no encontrado' })
        }
        res.json(group[0]);
    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};

const getUsersByGroup = async (req, res) => {
    try {
        const [ users ] = await Grupos.selectUsersByGroup(req.params.id_group);
        res.json(users);
    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};


// *****************revisar***************************
const createGroup = async (req, res) => {
    try {
        const [result] = await Grupos.insertGroup(req.body);
        res.json(result);
    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};

const addUserToGroup = async (req, res) => {
    console.log(req)
    console.log(res)
    try {
        const [result] = await Grupos.insertUserToGroup(req.body);
        res.json(result);
    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};

// ****************revisar****************************
const updateGroup = (req, res) => {
    const {id_group} = req.params; //destructuring: del objeto req.params quiero extraer el valor de la clave paciente_id y además almacenarlo en una variable llamadad paciente_id
    res.send(`Actualizamos el grupo ${ id_group }`);
};

const deleteGroup = async (req, res) => {
    const {id_group} = req.params; 
    try {
        const [ group ] = await Grupos.deleteGroup(id_group);
        res.json(group);
    } catch(err) {
        res.status(500).json({ error: err.message });
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
    deleteGroup
}