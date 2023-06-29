const { User } = require('../models/user');

// Atualizar um usuário existente
const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, password, email, country, birthday, role } = req.body;
  
    // Lógica para atualizar o usuário no banco de dados usando o modelo do Sequelize
    User.update({ name, password, email, country, birthday, role }, { where: { id } })
      .then(() => {
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Erro ao atualizar o usuário', error });
      });
  };
  
  // Excluir um usuário existente
  const deleteUser = (req, res) => {
    const { id } = req.params;
  
    // Lógica para excluir o usuário do banco de dados usando o modelo do Sequelize
    User.destroy({ where: { id } })
      .then(() => {
        res.status(200).json({ message: 'Usuário excluído com sucesso' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Erro ao excluir o usuário', error });
      });
  };
  
  // Criar um novo usuário administrador
  const createAdminUser = (req, res) => {
    const { name, password, email, country, birthday } = req.body;
  
    // Lógica para criar um novo usuário administrador no banco de dados usando o modelo do Sequelize
    User.create({ name, password, email, country, birthday, password, role: 'admin' })
      .then(() => {
        res.status(201).json({ message: 'Novo usuário administrador criado com sucesso' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Erro ao criar o usuário administrador', error });
      });
  };
  
  module.exports = {
    updateUser,
    deleteUser,
    createAdminUser
  };
  