document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita o comportamento padrão de envio do formulário

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const token = sessionStorage.getItem('token'); // Obtenha o token do sessionStorage

  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Inclua o token no cabeçalho Authorization
    },
    body: JSON.stringify({ email, password })
  });

  if (response.ok) {
    const data = await response.json();
    // Login bem-sucedido
    showMessage('success', 'Login realizado com sucesso');
    // Salve o token JWT recebido em sessionStorage
    sessionStorage.setItem('token', data.token);
    // Redirecione para a página /cards
    window.location.href = '/cards';
  } else {
    // Login falhou
    const data = await response.json();
    showMessage('error', data.message);
  }
});

function showMessage(type, message) {
  const messageContainer = document.getElementById('message');
  messageContainer.classList = type;
  messageContainer.textContent = message;
}

document.getElementById('registerButton').addEventListener('click', () => {
  window.location.href = '/register';
});
