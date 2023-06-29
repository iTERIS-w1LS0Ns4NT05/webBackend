document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const birthday = document.getElementById('birthday').value;
    const country = document.getElementById('country').value;
    const response = await fetch('/addUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, birthday, country })
    });
  
    if (response.ok) {
      // Cadastro bem-sucedido
      window.location.href = '/login';
    } else {
      // Cadastro falhou
      const data = await response.json();
      showMessage('error', data.message);
    }
  });
  
  function showMessage(type, message) {
    const messageContainer = document.getElementById('message');
    messageContainer.classList = type;
    messageContainer.textContent = message;
  }
  