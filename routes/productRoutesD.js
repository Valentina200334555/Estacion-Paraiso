const express = require('express');
const router = express.Router();
const productController = require('../controllers/productDController');

// Ruta para obtener productos
router.get('/', productController.getProducts);

// Ruta para eliminar un producto por su ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
