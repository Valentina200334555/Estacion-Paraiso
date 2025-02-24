const mysql = require('mysql2');

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '',
  database: 'product_db' 
});

// Función para obtener todos los clientes
const getAllClientes = (callback) => {
  connection.query('SELECT * FROM clientes', (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

// Función para agregar un cliente
const addCliente = (cliente, callback) => {
  const { documento, nombres, direccion, telefono } = cliente;
  connection.query(
    'INSERT INTO clientes (documento, nombres, direccion, telefono) VALUES (?, ?, ?, ?)',
    [documento, nombres, direccion, telefono],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    }
  );
};

module.exports = {
  getAllClientes,
  addCliente
};
