// const express = require('express');
const router = require('express').Router();

// Importacion de módulos propios
const { resetPassword, forgotPassword} = require('../../controllers/reset.controller');

// Ruta para solicitar la recuperación de contraseña
router.post('/', forgotPassword);

// Ruta para restablecer la contraseña
router.patch('/:token', resetPassword);

module.exports = router;
