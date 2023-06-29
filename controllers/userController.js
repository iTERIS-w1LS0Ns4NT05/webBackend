const { User } = require('../models/user');

const createUser = async (req, res) => {
  try {
    const { name, password, email, country, birthday } = req.body;

    // Criação do usuário no banco de dados usando o modelo User
    const user = await User.create({
      name,
      password,
      email,
      country,
      birthday
    });

    // Envie uma resposta adequada para o cliente
    res.status(201).json({ message: 'Usuario cadastrado com sucesso', user });
  } catch (error) {
    console.error('Erro ao cadastrar usuario:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuario' });
  }
};


module.exports = { createUser };
