document.addEventListener('DOMContentLoaded', () => {
    const deleteProductForm = document.getElementById('deleteProductForm');
    const deleteProductId = document.getElementById('deleteProductId');
    const productList = document.getElementById('productList');
  
    // Cargar todos los productos para mostrar en la lista
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
          const li = document.createElement('li');
          li.textContent = `${product.name} - ${product.price} USD`;
          productList.appendChild(li);
        });
      });
  
    // Manejar la eliminación de producto por ID
    deleteProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const productId = deleteProductId.value;
  
      fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error eliminando el producto');
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