const productModel = require('../models/productDModel');

// Obtener todos los productos
const getProducts = (req, res) => {
    productModel.getAllProducts((error, products) => {
      if (error) {
        return res.status(500).json({ error: 'Error obteniendo productos' });
      }
      res.json(products);
    });
  };

// Eliminar un producto por su ID
const deleteProduct = (req, res) => {
  const productId = req.params.id;

  productModel.deleteProductById(productId, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Error eliminando el producto' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  });
};

module.exports = {
    getProducts,
    deleteProduct
};
