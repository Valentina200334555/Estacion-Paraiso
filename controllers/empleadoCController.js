const empleadoModel = require('../models/empleadoCModel');

// Obtener todos los empleados
const getEmpleados = (req, res) => {
  empleadoModel.getAllEmpleados((error, empleados) => {
    if (error) {
      return res.status(500).json({ error: 'Error obteniendo empleados' });
    }
    res.json(empleados);
  });
};

// Agregar un nuevo empleado
const createEmpleado = (req, res) => {
  const empleado = req.body;

  empleadoModel.addEmpleado(empleado, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Error agregando empleado' });
    }
    res.status(201).json({ message: 'Empleado agregado', documentoEmpleado: result.insertId });
  });
};

module.exports = {
  getEmpleados,
  createEmpleado
};
