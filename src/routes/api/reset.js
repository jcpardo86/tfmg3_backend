// const express = require('express');
const router = require('express').Router();

// Importacion de módulos propios
const { requestPasswordReset, resetPassword} = require('../../controllers/reset.controller');

// Ruta para solicitar la recuperación de contraseña
router.post('/', requestPasswordReset);

// Ruta para restablecer la contraseña
router.post('/:token', resetPassword);

module.exports = router;
