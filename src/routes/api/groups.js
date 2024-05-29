// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getGroupsByUser, getGroupById, createGroup, updateGroup, deleteGroup, getUsersByGroup, addUserToGroup, selectUserGroup, updateGroupUser, deleteGroupUsers } = require('../../controllers/groups.controller');
const { checkToken } = require('../../helpers/middlewares');



// Definición de rutas y handlers
router.get('/:id_user', getGroupsByUser);
router.get('/group/:id_group', getGroupById);
router.get('/users/:id_group', getUsersByGroup); 
router.post('/', createGroup);
router.post('/user', addUserToGroup);
router.put('/update', updateGroup); 
router.delete('/:id_group', deleteGroup);
router.get('/:id_user/:id_group', selectUserGroup)
router.put('/updateGroupUser', updateGroupUser);
router.delete('/deleteGroupUsers/:id_group', deleteGroupUsers)
// Exportación de rutas
module.exports = router;