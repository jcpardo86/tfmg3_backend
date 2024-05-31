// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getUserById, userRegister, userLogin,selectAllUsers } = require('../../controllers/users.controller');
const { checkToken } = require('../../helpers/middlewares');


// Definición de rutas y handlers
router.get('/:id_user', checkToken, getUserById);
router.post('/register', userRegister);
router.post('/login', userLogin);
<<<<<<< Updated upstream
router.post('/', selectAllUsers);
router.get('users/:id_group', getUserById);

=======
router.get('/email/:email', checkToken, getUserByEmail);
>>>>>>> Stashed changes

// Exportación de rutas
module.exports = router;