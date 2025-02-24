const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '', // Cambia esto por tu contraseña de MySQL
  database: 'product_db'
});

// Función para registrar un usuario con contraseña encriptada
const registerUser = (username, password, role, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);

    connection.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, hash, role],
      (error, result) => {
        if (error) {
          return callback(error);
        }
        callback(null, result);
      }
    );
  });
};


// Función para verificar usuario y contraseña
const authenticateUser = (username, password, callback) => {
  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) return callback(error, null);
    if (results.length === 0) return callback(null, null);

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return callback(err, null);
      if (isMatch) {
        callback(null, { id: user.id, username: user.username, role: user.role });
      } else {
        callback(null, null);
      }
    });
  });
};


module.exports = {
  registerUser,
  authenticateUser
};
