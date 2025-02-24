const mysql = require('mysql2');

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '',
  database: 'product_db' 
});

// Función para obtener todos los empleados
const getAllEmpleados = (callback) => {
  connection.query('SELECT * FROM empleado', (error, results) => {
    if (error) {
      return callback(error, null);
    }
    callback(null, results);
  });
};

// Función para agregar un empleado
const addEmpleado = (empleado, callback) => {
  const { documento, nombres, direccion, telefono, salario } = empleado;
  connection.query(
    'INSERT INTO empleado (documento, nombres, direccion, telefono, salario) VALUES (?, ?, ?, ?, ?)',
    [documento, nombres, direccion, telefono, salario],
    (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    }
  );
};

module.exports = {
  getAllEmpleados,
  addEmpleado
};
