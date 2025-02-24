document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const message = document.getElementById('message');
  
    // Manejar el registro de usuario
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
  
        fetch('http://localhost:3000/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, role })
        })
        .then(response => response.json())
        .then(data => {
          message.textContent = data.message || data.error;
        })
        .catch(error => {
          message.textContent = 'Error de servidor';
        });
      });
    }
  });
  