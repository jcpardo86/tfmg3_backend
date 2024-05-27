// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getGroupsByUser, getGroupById, createGroup, updateGroup, deleteGroup, getUsersByGroup, addUserToGroup } = require('../../controllers/groups.controller');
const { checkToken } = require('../../helpers/middlewares');



// Definición de rutas y handlers
router.get('/:id_user', getGroupsByUser);
router.get('/group/:id_group', getGroupById);
router.get('/Allusers/:id_group', getUsersByGroup); 
router.post('/', createGroup);
router.post('/user', addUserToGroup);
router.put('/:id_group', updateGroup); 
router.delete('/:id_group', deleteGroup);

// Exportación de rutas
module.exports = router;