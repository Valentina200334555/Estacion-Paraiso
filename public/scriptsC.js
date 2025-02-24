document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('productForm');
  const productList = document.getElementById('productList');
  const productQueryForm = document.getElementById('productQueryForm');
  const productIdInput = document.getElementById('productId');
  const productInfo = document.getElementById('productInfo');
  const messageContainer = document.createElement('div'); 
  document.body.insertBefore(messageContainer, productList); 

  // Cargar productos existentes
  fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} COP`;
        productList.appendChild(li);
      });
    });

  // Manejar el envío del formulario para agregar un nuevo producto
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const product = { name, description, price };

    // Enviar los datos del nuevo producto al servidor
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        // Mostrar mensaje de éxito
        messageContainer.style.color = 'green';
        messageContainer.textContent = 'Producto agregado exitosamente';

        // Agregar el producto a la lista en la interfaz
        const li = document.createElement('li');
        li.textContent = `${product.name} - ${product.price} COP`;
        productList.appendChild(li);

        // Limpiar el formulario
        productForm.reset();

        // Borrar el mensaje después de 3 segundos
        setTimeout(() => {
          messageContainer.textContent = '';
        }, 3000);
      })
      .catch(error => {
        // Mostrar mensaje de error
        messageContainer.style.color = 'red';
        messageContainer.textContent = 'Hubo un error al agregar el producto';

        // Borrar el mensaje después de 3 segundos
        setTimeout(() => {
          messageContainer.textContent = '';
        }, 3000);
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

