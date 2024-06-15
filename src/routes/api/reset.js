// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios
const { resetPassword, forgotPassword} = require('../../controllers/reset.controller');


// Definición de rutas y handlers

router.post('/', forgotPassword); // Ruta para solicitar la recuperación de contraseña
router.patch('/:token', resetPassword); // Ruta para restablecer la contraseña


// Exportación de rutas
module.exports = router;
