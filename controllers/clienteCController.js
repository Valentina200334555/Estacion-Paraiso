const clienteModel = require('../models/clienteCModel');

// Obtener todos los clientes
const getClientes = (req, res) => {
  clienteModel.getAllClientes((error, clientes) => {
    if (error) {
      return res.status(500).json({ error: 'Error obteniendo clientes' });
    }
    res.json(clientes);
  });
};

// Agregar un nuevo cliente
const createCliente = (req, res) => {
  const cliente = req.body;

  clienteModel.addCliente(cliente, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Error agregando cliente' });
    }
    res.status(201).json({ message: 'Cliente agregado', clienteDocumento: result.insertId });
  });
};

module.exports = {
  getClientes,
  createCliente
};



