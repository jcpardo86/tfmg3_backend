// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importación de módulo propio
const { checkToken } = require('../helpers/middlewares');

// Definición de Rutas
router.use('/groups', checkToken, require('./api/groups'));

router.use('/users', require('./api/users'));

router.use('/spents', checkToken, require('./api/spents'));

router.use('/messages', require('./api/messages'));

router.use('/reset', require('./api/reset'));

// Exportación de rutas
module.exports = router;
