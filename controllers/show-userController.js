const { User } = require('../models');

const getUsers = async (req, res) => {
  try {
    // Buscar todos os usuarios do banco de dados
    const users = await User.findAll();

    // Envie uma resposta adequada para o cliente
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuarios:', error);
    res.status(500).json({ message: 'Erro ao buscar usuarios' });
  }
};

module.exports = { getUsers };
