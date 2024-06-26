// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { updateDebtsByGroup, getDebtsByGroup, updateStatus } = require('../../controllers/debts.controller');
const { checkAdmin } = require('../../helpers/middlewares');

// Definición de rutas y handlers
router.get('/:id_group', getDebtsByGroup);
router.put('/', checkAdmin, updateDebtsByGroup);
router.put('/status/:id_debt', updateStatus);

// Exportación de rutas
module.exports = router;