const mysql = require('mysql2');

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

// Función para eliminar un producto por su ID
const deleteProductById = (id, callback) => {
  connection.query('DELETE FROM products WHERE id = ?', [id], (error, result) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, result);
  });
};

module.exports = {
    getAllProducts,
    deleteProductById
};