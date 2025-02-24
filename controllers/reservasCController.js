const reservaModel = require('../models/reservaCModel');

// Obtener todas las reservas
const getReservas = (req, res) => {
  reservaModel.getAllReservas((error, reservas) => {
    if (error) {
      return res.status(500).json({ error: 'Error obteniendo reservas' });
    }
    res.json(reservas);
  });
};

// Agregar una nueva reserva
const createReserva = (req, res) => {
  const reserva = req.body;

  reservaModel.addReserva(reserva, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Error agregando reserva' });
    }
    res.status(201).json({ message: 'Reserva agregada', reservaId: result.insertId });
  });
};

module.exports = {
  getReservas,
  createReserva
};

