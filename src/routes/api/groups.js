// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getGroupsByUser, getGroupById, createGroup, updateGroup, deleteGroup, getUsersByGroup, addUserToGroup, updateStatusGroup, getStatus, getImageGroup, getUserGroup} = require('../../controllers/groups.controller');



// Definición de rutas y handlers
router.get('/:id_user', getGroupsByUser);
router.get('/group/:id_group', getGroupById);
router.get('/users/:id_group', getUsersByGroup); 
router.get('/status/:id_group', getStatus);
router.get('/groupimage/:id_group', getImageGroup);
router.post('/', createGroup);
router.put('/:id_group', updateGroup); 
router.put('/status/:id_group', updateStatusGroup);
router.post('/user', addUserToGroup);
router.delete('/:id_group', deleteGroup);
router.get('/:id_user/:id_group', getUserGroup);
router.put('/update', updateGroup); 
// Exportación de rutas
module.exports = router;