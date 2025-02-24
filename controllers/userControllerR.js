const userModel = require('../models/userModel');

// Registrar un nuevo usuario
const registerUser = (req, res) => {
  const { username, password, role } = req.body;

  userModel.registerUser(username, password, role, (error, result) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'El nombre de usuario ya existe' });
      }
      return res.status(500).json({ error: 'Error de servidor' });
    }
    res.json({ message: 'Usuario registrado correctamente' });
  });
};

module.exports = {
  registerUser
};
