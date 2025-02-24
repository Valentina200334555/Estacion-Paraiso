document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.getElementById('clienteForm');
    const clienteList = document.getElementById('clienteList');
    const clienteQueryForm = document.getElementById('clienteQueryForm');
    const clienteDocumentoInput = document.getElementById('clienteDocumento');
    const clienteInfo = document.getElementById('clienteInfo');
    const messageContainer = document.createElement('div'); // Contenedor para mostrar mensajes
    document.body.insertBefore(messageContainer, clienteList); 
  
    // Cargar clientes existentes
    fetch('http://localhost:3000/clientes')
      .then(response => response.json())
      .then(clientes => {
        clientes.forEach(cliente => {
          const li = document.createElement('li');
          li.textContent = `${cliente.nombres} - ${cliente.telefono}`;
          clienteList.appendChild(li);
        });
      });
  
    // Manejar el envío del formulario para agregar un nuevo cliente
    clienteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const documento = document.getElementById('documento').value;
      const nombres = document.getElementById('nombres').value;
      const direccion = document.getElementById('direccion').value;
      const telefono = document.getElementById('telefono').value;
  
      const cliente = { documento, nombres, direccion, telefono };
  
      // Enviar los datos del nuevo cliente al servidor
      fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
      })
        .then(response => response.json())
        .then(data => {
          // Mostrar mensaje de éxito
          messageContainer.style.color = 'green';
          messageContainer.textContent = 'Cliente agregado exitosamente';
  
          // Agregar el cliente a la lista en la interfaz
          const li = document.createElement('li');
          li.textContent = `${cliente.nombres} - ${cliente.telefono}`;
          clienteList.appendChild(li);
  
          // Limpiar el formulario
          clienteForm.reset();
  
          // Borrar el mensaje después de 3 segundos
          setTimeout(() => {
            messageContainer.textContent = '';
          }, 3000);
        })
        .catch(error => {
          // Mostrar mensaje de error
          messageContainer.style.color = 'red';
          messageContainer.textContent = 'Hubo un error al agregar el cliente';
  
          // Borrar el mensaje después de 3 segundos
          setTimeout(() => {
            messageContainer.textContent = '';
          }, 3000);
        });
    });
  
    // Manejar la consulta de cliente por documento
    clienteQueryForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const documento = clienteDocumentoInput.value;
  
      // Realizar una consulta por el documento del cliente
      fetch(`http://localhost:3000/clientes/${documento}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Cliente no encontrado');
          }
          return response.json();
        })
        .then(cliente => {
          clienteInfo.innerHTML = `
            <h3>${cliente.nombres}</h3>
            <p>Dirección: ${cliente.direccion}</p>
            <p>Teléfono: ${cliente.telefono}</p>
          `;
        })
        .catch(error => {
          clienteInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
    });
  });
  