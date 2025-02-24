// reservasController.js
const reservaModel = require('../models/reservasRModel'); // Asumiendo que tienes un modelo para las reservas

// Obtener todas las reservas
const getReservas = (req, res) => {
  reservaModel.getAllReservas((error, reservas) => {
    if (error) {
      return res.status(500).json({ error: 'Error obteniendo reservas' });
    }
    res.json(reservas);
  });
};

// Obtener una reserva por documento
const getReservaByDocumento = (req, res) => {
  const documento = req.params.documento;
  reservaModel.getReservaByDocumento(documento, (error, reserva) => {
    if (error) {
      return res.status(500).json({ error: 'Error obteniendo la reserva' });
    }
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reserva);
  });
};

module.exports = {
  getReservas,
  getReservaByDocumento
};



  