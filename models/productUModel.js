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

// Función para obtener un producto por su ID
const getProductById = (id, callback) => {
  connection.query('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results[0]);
  });
};

// Función para actualizar un producto por su ID
const updateProductById = (id, updatedProduct, callback) => {
  const { name, description, price } = updatedProduct;
  connection.query(
    'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',
    [name, description, price, id],
    (error, result) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, result);
    }
  );
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProductById
};
