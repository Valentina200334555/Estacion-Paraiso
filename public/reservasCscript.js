document.addEventListener('DOMContentLoaded', () => {
  const reservaForm = document.getElementById('reservaForm');
  /*const reservaList = document.getElementById('reservaList');*/
  const messageContainer = document.createElement('div'); // Contenedor para mostrar mensajes
  document.body.insertBefore(messageContainer, reservaList); 

  // Cargar reservas existentes
  fetch('http://localhost:3000/reservas')
    .then(response => response.json())
    .then(reservas => {
      reservas.forEach(reserva => {
        const li = document.createElement('li');
        li.textContent = `Reserva del documento: ${reserva.documento}, Habitación: ${reserva.tipo_habitacion}`;
        reservaList.appendChild(li);
      });
    });

  // Manejar el envío del formulario para agregar una nueva reserva
  reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const documento = document.getElementById('documento').value;
    const check_in = document.getElementById('check_in').value;
    const check_out = document.getElementById('check_out').value;
    const tipo_habitacion = document.getElementById('tipo_habitacion').value;
    const numero_personas = document.getElementById('numero_personas').value;

    const reserva = { documento, check_in, check_out, tipo_habitacion, numero_personas };

    // Enviar los datos de la nueva reserva al servidor
    fetch('http://localhost:3000/reservas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reserva)
    })
      .then(response => response.json())
      .then(data => {
        // Mostrar mensaje de éxito
        messageContainer.style.color = 'green';
        messageContainer.textContent = 'Reserva registrada exitosamente';

        // Agregar la reserva a la lista en la interfaz
        const li = document.createElement('li');
        li.textContent = `Reserva del documento: ${reserva.documento}, Habitación: ${reserva.tipo_habitacion}`;
        reservaList.appendChild(li);

        // Limpiar el formulario
        reservaForm.reset();

        // Borrar el mensaje después de 3 segundos
        setTimeout(() => {
          messageContainer.textContent = '';
        }, 3000);
      })
      .catch(error => {
        // Mostrar mensaje de error
        messageContainer.style.color = 'red';
        messageContainer.textContent = 'Hubo un error al registrar la reserva';

        // Borrar el mensaje después de 3 segundos
        setTimeout(() => {
          messageContainer.textContent = '';
        }, 3000);
      });
  });
});
