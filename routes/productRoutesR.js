const express = require('express');
const router = express.Router();
const productController = require('../controllers/productRCrontroller');

// Ruta para obtener todos los productos
router.get('/', productController.getProducts);

// Ruta para obtener un producto por su ID
router.get('/:id', productController.getProduct);

module.exports = router;
