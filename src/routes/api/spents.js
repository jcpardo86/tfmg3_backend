// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getSpentsByGroup, getTotalSpentByGroup, getCuentas, createSpent, updateSpent, deleteSpent } = require('../../controllers/spents.controller');
const { checkToken } = require('../../helpers/middlewares');

// Definición de rutas y handlers
router.get('/:id_group', getSpentsByGroup);
router.get('/total/:id_group', getTotalSpentByGroup);
router.get('/saldos/:id_group', getCuentas);
router.put('/:id_spend', updateSpent);
router.delete('/:id_spend', deleteSpent);
router.post('/', createSpent);

// Exportación de rutas
module.exports = router;