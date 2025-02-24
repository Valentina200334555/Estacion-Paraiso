const express = require('express');
const router = express.Router();
const productController = require('../controllers/productCController');

// Ruta para obtener productos
router.get('/', productController.getProducts);

// Ruta para agregar un producto
router.post('/', productController.createProduct);

module.exports = router;





