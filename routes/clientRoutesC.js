const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteCController');

// Ruta para obtener clientes
router.get('/', clienteController.getClientes);

// Ruta para agregar un cliente
router.post('/', clienteController.createCliente);

module.exports = router;
