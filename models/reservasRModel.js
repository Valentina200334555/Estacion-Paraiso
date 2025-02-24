const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3307',
  password: '',
  database: 'product_db'
});

// Obtener reserva por documento
const getReservaByDocumento = (documento, callback) => {
  const query = 'SELECT * FROM reservas WHERE documento = ?';
  connection.query(query, [documento], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    if (results.length > 0) {
      callback(null, results[0]); 
    } else {
      callback(null, null); 
    }
  });
};

module.exports = {
  getReservaByDocumento
};



