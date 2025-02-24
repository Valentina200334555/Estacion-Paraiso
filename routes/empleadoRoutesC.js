const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoCController');

// Ruta para obtener empleados
router.get('/', empleadoController.getEmpleados);

// Ruta para agregar un empleado
router.post('/', empleadoController.createEmpleado);

module.exports = router;
