// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getSpentsByGroup, getTotalSpentByGroup, getCuentas, createSpent, updateSpent, deleteSpent, getSpentById, updateSaldo, updateImporteLiquidado} = require('../../controllers/spents.controller');

// Definición de rutas y handlers
router.get('/:id_group', getSpentsByGroup);
router.get('/total/:id_group', getTotalSpentByGroup);
router.get('/spent/:id_spent', getSpentById);
router.get('/saldos/:id_group', getCuentas);
router.put('/:id_spent', updateSpent);
router.put('/', updateSaldo);
router.put('/liquidar/:id_group', updateImporteLiquidado);
router.post('/', createSpent);
router.delete('/:id_spent', deleteSpent);



// Exportación de rutas
module.exports = router;