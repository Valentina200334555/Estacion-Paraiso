const productModel = require('../models/productCModel');

// Obtener todos los productos
const getProducts = (req, res) => {
  productModel.getAllProducts((error, products) => {
    if (error) {
      return res.status(500).json({ error: 'Error obteniendo productos' });
    }
    res.json(products);
  });
};

// Agregar un nuevo producto
const createProduct = (req, res) => {
  const product = req.body;  
  
  productModel.addProduct(product, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Error agregando producto' });
    }
    res.status(201).json({ message: 'Producto agregado', productId: result.insertId });
  });
};

module.exports = {
  getProducts,
  createProduct
};






