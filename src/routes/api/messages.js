// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores
const { getMessagesByGroup } = require('../../controllers/messages.controller');



// Definición de rutas y handlers
router.get('/:id_group', getMessagesByGroup);

// Exportación de rutas
module.exports = router;