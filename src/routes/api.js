// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importación de módulo propio
const { checkToken } = require('../helpers/middlewares');

// Definición de Rutas
router.use('/groups', require('./api/groups'));  

router.use('/users', require('./api/users'));

router.use('/spents', require('./api/spents'));

// Exportación de rutas
module.exports = router;