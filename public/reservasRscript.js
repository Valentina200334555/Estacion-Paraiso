document.addEventListener('DOMContentLoaded', () => {
  const reservaQueryForm = document.getElementById('reservaQueryForm');
  const documentoInput = document.getElementById('documento');
  const reservaInfo = document.getElementById('reservaInfo');
  const reservaList = document.getElementById('reservaList');

  // Cargar todas las reservas
  fetch('http://localhost:3000/reservas')
    .then(response => response.json())
    .then(reservas => {
      reservas.forEach(reserva => {
        const li = document.createElement('li');
        li.textContent = `${reserva.documento} - ${reserva.tipo_habitacion} (${reserva.check_in} - ${reserva.check_out})`;
        reservaList.appendChild(li);
      });
    });

  // Manejar la consulta de reserva por documento
  reservaQueryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const documento = documentoInput.value;

    // Realizar una consulta por el documento de la reserva
    fetch(`http://localhost:3000/reservas/${documento}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Reserva no encontrada');
        }
        return response.json();
      })
      .then(reserva => {
        reservaInfo.innerHTML = `
          <h3>Reserva de ${reserva.documento}</h3>
          <p>Tipo de Habitación: ${reserva.tipo_habitacion}</p>
          <p>Fecha de entrada: ${reserva.check_in}</p>
          <p>Fecha de salida: ${reserva.check_out}</p>
          <p>Número de Personas: ${reserva.numero_personas}</p>
        `;
      })
      .catch(error => {
        reservaInfo.innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  });
});

  
