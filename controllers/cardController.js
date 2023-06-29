const { Card } = require('../models/magiccard');

const createCard = async (req, res) => {
  try {
    const { name, manaCost, type, rarity, color, collection } = req.body;

    // Criação do usuário no banco de dados usando o modelo Card
    const card = await Card.create({
        name,
        manaCost,
        type,
        rarity,
        color,
        collection
    });

    // Envie uma resposta adequada para o cliente
    res.status(201).json({ message: 'Card cadastrado com sucesso', card });
  } catch (error) {
    console.error('Erro ao cadastrar card:', error);
    res.status(500).json({ message: 'Erro ao cadastrar card' });
  }
};

// Atualizar um Card existente
const updateCard = (req, res) => {
  const { id } = req.params;
  const { name, manaCost, type, rarity, color, collection } = req.body;

  // Lógica para atualizar o Card no banco de dados usando o modelo do Sequelize
  Card.update({ name, manaCost, type, rarity, color, collection }, { where: { id } })
    .then(() => {
      res.status(200).json({ message: 'Card atualizado com sucesso' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Erro ao atualizar o Card', error });
    });
};

// Excluir um Card existente
const deleteCard = (req, res) => {
  const { id } = req.params;

  // Lógica para excluir o Card do banco de dados usando o modelo do Sequelize
  Card.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ message: 'Card excluído com sucesso' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Erro ao excluir o Card', error });
    });
};



module.exports = { createCard, updateCard, deleteCard };
