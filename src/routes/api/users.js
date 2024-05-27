// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getUserById, userRegister, userLogin, getUserByEmail } = require('../../controllers/users.controller');
const { checkToken } = require('../../helpers/middlewares');


// Definición de rutas y handlers
router.get('/:id_user', getUserById);
router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/email/:email', getUserByEmail);

// Exportación de rutas
module.exports = router;