// Importación de módulo externo y creación de router.
const router = require('express').Router();

// Importacion de módulos propios - controladores y middleware
const { getSpentsByGroup, getTotalSpentByGroup, getCuentas, createSpent, updateSpent, deleteSpent, getSpentById} = require('../../controllers/spents.controller');
const { checkToken } = require('../../helpers/middlewares');

// Definición de rutas y handlers
router.get('/:id_group', getSpentsByGroup);
router.get('/total/:id_group', getTotalSpentByGroup);
router.get('/saldos/:id_group', getCuentas);
router.put('/:id_spent', updateSpent);
router.delete('/:id_spent', deleteSpent);
router.post('/', createSpent);
router.get('/spent/:id_spent', getSpentById);


// Exportación de rutas
module.exports = router;