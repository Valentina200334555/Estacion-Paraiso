const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservasCController');

// Ruta para obtener todas las reservas
router.get('/', reservaController.getReservas);

// Ruta para agregar una nueva reserva
router.post('/', reservaController.createReserva);

module.exports = router;
