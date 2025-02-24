const productModel = require('../models/productUModel');

// Obtener todos los productos
const getProducts = (req, res) => {
  productModel.getAllProducts((error, products) => {
    if (error) {
      return res.status(500).json({ error: 'Error obteniendo productos' });
    }
    res.json(products);
  });
};

// Obtener un producto por su ID
const getProduct = (req, res) => {
  const productId = req.params.id;
  productModel.getProductById(productId, (error, product) => {
    if (error) {
      return res.status(500).json({ error: 'Error obteniendo el producto' });
    }
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  });
};

// Actualizar un producto por su ID
const updateProduct = (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  productModel.updateProductById(productId, updatedProduct, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Error actualizando el producto' });
    }
    res.json({ message: 'Producto actualizado correctamente' });
  });
};

module.exports = {
  getProducts,
  getProduct,
  updateProduct
};