document.addEventListener('DOMContentLoaded', () => {
    const updateProductForm = document.getElementById('updateProductForm');
    const updateProductId = document.getElementById('updateProductId');
    const updateProductName = document.getElementById('updateProductName');
    const updateProductDescription = document.getElementById('updateProductDescription');
    const updateProductPrice = document.getElementById('updateProductPrice');
    const productList = document.getElementById('productList');
  
    // Cargar todos los productos
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
          const li = document.createElement('li');
          li.textContent = `${product.name} - ${product.price} USD`;
          productList.appendChild(li);
        });
      });
  
    // Manejar la actualización de producto por ID
    updateProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const productId = updateProductId.value;
      const updatedProduct = {
        name: updateProductName.value,
        description: updateProductDescription.value,
        price: parseFloat(updateProductPrice.value)
      };
  
      fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error actualizando el producto');
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
        location.reload(); 
      })
      .catch(error => {
        alert(error.message);
      });
    });
  });
  