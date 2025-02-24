document.addEventListener('DOMContentLoaded', () => {
    const empleadoForm = document.getElementById('empleadoForm');
    const empleadoList = document.getElementById('empleadoList');
    const empleadoQueryForm = document.getElementById('empleadoQueryForm');
    const empleadoDocumentoInput = document.getElementById('empleadoDocumento');
    const empleadoInfo = document.getElementById('empleadoInfo');
    const messageContainer = document.createElement('div'); // Contenedor para mostrar mensajes
    document.body.insertBefore(messageContainer, empleadoList); 

    // Cargar empleados existentes
    fetch('http://localhost:3000/empleado')
      .then(response => response.json())
      .then(empleados => {
        empleados.forEach(empleado => {
          const li = document.createElement('li');
          li.textContent = `${empleado.nombres} - ${empleado.telefono}`;
          empleadoList.appendChild(li);
        });
      });

    // Manejar el envío del formulario para agregar un nuevo empleado
    empleadoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const documento = document.getElementById('documento').value;
      const nombres = document.getElementById('nombres').value;
      const direccion = document.getElementById('direccion').value;
      const telefono = document.getElementById('telefono').value;
      const salario = document.getElementById('salario').value;

      const empleado = { documento, nombres, direccion, telefono, salario };

      // Enviar los datos del nuevo empleado al servidor
      fetch('http://localhost:3000/empleado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(empleado)
      })
        .then(response => response.json())
        .then(data => {
          // Mostrar mensaje de éxito
          messageContainer.style.color = 'green';
          messageContainer.textContent = 'Empleado agregado exitosamente';

          // Agregar el empleado a la lista en la interfaz
          const li = document.createElement('li');
          li.textContent = `${empleado.nombres} - ${empleado.telefono}`;
          empleadoList.appendChild(li);

          // Limpiar el formulario
          empleadoForm.reset();

          // Borrar el mensaje después de 3 segundos
          setTimeout(() => {
            messageContainer.textContent = '';
          }, 3000);
        })
        .catch(error => {
          // Mostrar mensaje de error
          messageContainer.style.color = 'red';
          messageContainer.textContent = 'Hubo un error al agregar el empleado';

          // Borrar el mensaje después de 3 segundos
          setTimeout(() => {
            messageContainer.textContent = '';
          }, 3000);
        });
    });

    // Manejar la consulta de empleado por documento
    empleadoQueryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const documento = empleadoDocumentoInput.value;

      // Realizar una consulta por el documento del empleado
      fetch(`http://localhost:3000/empleado/${documento}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Empleado no encontrado');
          }
          return response.json();
        })
        .then(empleado => {
          empleadoInfo.innerHTML = `
            <h3>${empleado.nombres}</h3>
            <p>Dirección: ${empleado.direccion}</p>
            <p>Teléfono: ${empleado.telefono}</p>
            <p>Salario: ${empleado.salario}</p>
          `;
        })
        .catch(error => {
          empleadoInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
    });
  });
