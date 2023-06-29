const { User } = require('../models');

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
// Atualizar um usuário existente
const updatedUser = (req, res) => {
  const { id } = req.params;
  const { name, password, email, country, birthday } = req.body;

  // Verificar se o usuário autenticado está tentando atualizar o seu próprio cadastro
  if (req.user.id !== id) {
    return res.status(403).json({ message: 'Acesso não autorizado' });
  }

  // Lógica para atualizar o usuário no banco de dados usando o modelo do Sequelize
  User.update({ name, password, email, country, birthday }, { where: { id } })
    .then(() => {
      res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Erro ao atualizar o usuário', error });
    });
};


module.exports = { createUser, updatedUser };
