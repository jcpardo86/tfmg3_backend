// Importación de módulo externo y creación de router.
const router = require('express').Router();

const { uploadUserImage } = require('../../controllers/uploadUserImage.controller');
// Importacion de módulos propios - controladores y middleware
const { getUserById, userRegister, userLogin, getUserByEmail, updateUserById, getImageUser } = require('../../controllers/users.controller');
const { checkToken } = require('../../helpers/middlewares');


// Definición de rutas y handlers
router.get('/:id_user', checkToken, getUserById);
router.get('/email/:email', getUserByEmail);

//LARA - añado el get para obtener el nombre del archivo de imagen del usuario
router.get('/userimage/:id_user', getImageUser);

router.post('/register', userRegister);
router.post('/login', userLogin);
router.put('/:id_user', checkToken, updateUserById);



// Exportación de rutas
module.exports = router;