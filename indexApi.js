const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Importar rutas
const userRoutesR = require('./routes/userRoutesR');
const userRoutesA = require('./routes/userRoutesA');
const productRoutesC = require('./routes/productRoutesC');
const productRoutesR = require('./routes/productRoutesR');
const productRoutesU = require('./routes/productRoutesU');
const productRoutesD = require('./routes/productRoutesD');
const clientRoutesC = require('./routes/clientRoutesC');
const empleadoRoutesC = require('./routes/empleadoRoutesC');
const reservasRoutesC = require('./routes/reservasRouterC');
const reservasRoutesR = require('./routes/reservasRoutesR');


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: true
}));

// Rutas para usuarios
app.use('/users', userRoutesR);
app.use('/users', userRoutesA);

// Rutas para productos
app.use('/products', productRoutesC);
app.use('/products', productRoutesR);
app.use('/products', productRoutesU);
app.use('/products', productRoutesD);

//Rutas para clientes
app.use('/clientes', clientRoutesC);

//Rutas para empleados
app.use('/empleado', empleadoRoutesC);

//Ruta para reservas
app.use('/reservas', reservasRoutesC);
app.use('/reservas',reservasRoutesR)



// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});











