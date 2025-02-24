const mysql = require('mysql2');

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'root',
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


// Función para agregar un producto
const addProduct = (product, callback) => {
  const { name, description, price } = product;
  connection.query(
    'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
    [name, description, price],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    }
  );
};

module.exports = {
  getAllProducts,
  addProduct
};





