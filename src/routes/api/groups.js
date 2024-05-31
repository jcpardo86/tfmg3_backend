// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getGroupsByUser, getGroupById, createGroup, updateGroup, deleteGroup, getUsersByGroup, addUserToGroup } = require('../../controllers/groups.controller');



// Definición de rutas y handlers
router.get('/:id_user', getGroupsByUser);
router.get('/group/:id_group', getGroupById);
router.get('/users/:id_group', getUsersByGroup); 
router.post('/', createGroup);
router.put('/:id_group', updateGroup); 
router.post('/user', addUserToGroup);
router.delete('/:id_group', deleteGroup);

// Exportación de rutas
module.exports = router;