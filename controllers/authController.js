const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email inválido' });
    }

    // Verificar se a senha está correta
    if (password !== user.password) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

   // Gerar um token JWT com informações do usuário
   const token = jwt.sign({ email: user.email, role: user.role }, 'chave_secreta');

   // Enviar o token como parte da resposta JSON
   res.json({ token });
 } catch (error) {
   console.error('Erro ao fazer login:', error);
   res.status(500).json({ message: 'Erro ao fazer login' });
 }
};
module.exports = { login };
