const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
  // Verificar se o token de autenticação está presente no cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  try {
    // Verificar se o token é válido
    const decodedToken = jwt.verify(token, 'chave_secreta');

    // Armazenar o token no objeto de requisição para uso posterior
    req.token = decodedToken;

    // Chamar a próxima função de middleware
    next();
  } catch (error) {
    console.error('Erro ao verificar o token:', error);
    res.status(401).json({ message: 'Token de autenticação inválido' });
  }
};

module.exports = { authToken };
