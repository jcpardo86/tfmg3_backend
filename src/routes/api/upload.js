// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores
const uploadUserImage = require('../../controllers/uploadUserImage.controller');
const uploadGroupImage = require('../../controllers/uploadGroupImage.controller');


// Definición de rutas y handlers
router.post('/userimage', uploadUserImage.upload, uploadUserImage.uploadUserImage);
router.post('/groupimage', uploadGroupImage.upload , uploadGroupImage.uploadGroupImage);


// Exportación de rutas
module.exports = router;
