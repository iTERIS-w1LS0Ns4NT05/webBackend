const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar um token JWT com informações do usuário
    const token = jwt.sign({ email: user.email, role: user.role }, 'chave_secreta');

    // Enviar o token como resposta
    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

module.exports = { login };
