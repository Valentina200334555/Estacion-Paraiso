const express = require('express');
const router = express.Router();
const productController = require('../controllers/productUController');

// Ruta para obtener todos los productos
router.get('/', productController.getProducts);

// Ruta para obtener un producto por su ID
router.get('/:id', productController.getProduct);

// Ruta para actualizar un producto por su ID
router.put('/:id', productController.updateProduct);

module.exports = router;