// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getSpentsByGroup, getTotalSpentByGroup, /*getCuentas*/ createSpent, updateSpent, deleteSpent, getSpentById, updateSaldo, updateImporteLiquidado} = require('../../controllers/spents.controller');
const { checkAdmin } = require('../../helpers/middlewares');

// Definición de rutas y handlers
router.get('/:id_group', getSpentsByGroup);
router.get('/total/:id_group', getTotalSpentByGroup);
router.get('/spent/:id_spent', getSpentById);
router.put('/:id_spent', checkAdmin, updateSpent);
router.put('/', checkAdmin, updateSaldo);
router.put('/liquidar/:id_group', checkAdmin, updateImporteLiquidado);
router.post('/', checkAdmin, createSpent);
router.delete('/:id_spent', deleteSpent);


// Exportación de rutas
module.exports = router;