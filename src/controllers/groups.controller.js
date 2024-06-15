
// Importación de módulo interno
const Group = require('../models/group.model');
const Mail = require('../helpers/email_utils');
const User = require('../models/user.model');


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

const getImageGroup = async (req, res, next) => {
      const id_group = req.params.id_group;
      if (!id_group) {
        return res.status(400).json('Faltan datos requeridos');
      }
      const [image] = await Group.selectImageGroup(id_group);
      if (!image) {
        return res.status(404).json('Imagen no encontrada');
      }
      res.json(image);   
};  

const getUserGroup = async (req, res, next) => {
    try {
        const [ groups ] = await Group.selectUserGroup(req.params.id_user, req.params.id_group);
        res.json(groups);
    } catch(error) {
        next(error);
    };
};


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

        //Enviamos email al usuario para informarle de que ha sido añadido a un grupo
        const [user] = await User.selectUserById(req.body.idUsuario);
        await Mail.mailer(req.body, user[0], "new_group");
        
        res.json(result);
        
    } catch(error) {
        next(error);
    };
};

const updateGroup = async(req, res) => {
    try {
        const [ group ] = await Group.updateGroup(req.body);
        res.json(group);
    } catch(err) {
        res.status(500).json({ error: err.message });
    };
};


const updateStatusGroup = async (req, res, next) => {
    const { id_group } = req.params;
    try {
        const [ result ] = await Group.updateStatus(parseInt(id_group), req.body.status);
        res.json(result);
    } catch(error) {
        next(error);
    };
};

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
    getImageGroup,
    getStatus,
    getUserGroup,
    createGroup,
    addUserToGroup,
    updateGroup,
    updateStatusGroup,
    deleteGroup
}