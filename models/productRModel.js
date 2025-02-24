const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3307',
  password: '', 
  database: 'product_db'
});

// Función para obtener todos los productos
const getAllProducts = (callback) => {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

// Función para obtener un producto por su ID
const getProductById = (id, callback) => {
  connection.query('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results[0]);
  });
};

module.exports = {
  getAllProducts,
  getProductById
};