const mysql = require('mysql2');

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '',
  database: 'product_db' 
});

// Función para obtener todas las reservas
const getAllReservas = (callback) => {
  connection.query('SELECT * FROM reservas', (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

// Función para agregar una nueva reserva
const addReserva = (reserva, callback) => {
  const { documento, check_in, check_out, tipo_habitacion, numero_personas } = reserva;
  connection.query(
    'INSERT INTO reservas (documento, check_in, check_out, tipo_habitacion, numero_personas) VALUES (?, ?, ?, ?, ?)',
    [documento, check_in, check_out, tipo_habitacion, numero_personas],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    }
  );
};

module.exports = {
  getAllReservas,
  addReserva
};
