document.addEventListener('DOMContentLoaded', () => {
    const productQueryForm = document.getElementById('productQueryForm');
    const productIdInput = document.getElementById('productId');
    const productInfo = document.getElementById('productInfo');
    const productList = document.getElementById('productList');
  
    // Cargar todos los productos
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
          const li = document.createElement('li');
          li.textContent = `${product.name} - ${product.price} COP`;
          productList.appendChild(li);
        });
      });
  
    // Manejar la consulta de producto por ID
    productQueryForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const productId = productIdInput.value;
  
      // Realizar una consulta por el ID del producto
      fetch(`http://localhost:3000/products/${productId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Producto no encontrado');
          }
          return response.json();
        })
        .then(product => {
          productInfo.innerHTML = `
            <h3>${product.name}</h3>
            <p>Descripción: ${product.description}</p>
            <p>Precio: ${product.price} COP</p>
          `;
        })
        .catch(error => {
          productInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
    });
  });
  