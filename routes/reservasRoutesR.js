const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservasRController'); // Asegúrate de que el nombre del archivo sea correcto

// Ruta para obtener todas las reservas
router.get('/', reservaController.getReservas);

// Ruta para obtener una reserva por documento
router.get('/:documento', reservaController.getReservaByDocumento);

module.exports = router;


