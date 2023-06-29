const { Card } = require('../models');
const { Collection } = require('../models');

const createCard = async (req, res) => {
  try {
    const { name, manaCost, type, rarity, color, collection } = req.body;

    // Criação do card no banco de dados usando o modelo Card
    const card = await Card.create({
      name,
      manaCost,
      type,
      rarity,
      color,
      collectionId: collection, // Associando a coleção pelo ID
    });

    // Envie uma resposta adequada para o cliente
    res.status(201).json({ message: 'Card cadastrado com sucesso', card });
  } catch (error) {
    console.error('Erro ao cadastrar card:', error);
    res.status(500).json({ message: 'Erro ao cadastrar card' });
  }
};

const updateCard = (req, res) => {
  const { id } = req.params;
  const { name, manaCost, type, rarity, color, collection } = req.body;

  // Lógica para atualizar o card no banco de dados usando o modelo do Sequelize
  Card.update(
    { name, manaCost, type, rarity, color, collectionId: collection },
    { where: { id } }
  )
    .then(() => {
      res.status(200).json({ message: 'Card atualizado com sucesso' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Erro ao atualizar o Card', error });
    });
};

const deleteCard = (req, res) => {
  const { id } = req.params;

  // Lógica para excluir o card do banco de dados usando o modelo do Sequelize
  Card.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ message: 'Card excluído com sucesso' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Erro ao excluir o Card', error });
    });
};

const getCollection = async (req, res) => {
  try {
    const { cardId } = req.params;

    // Buscar o card pelo ID no banco de dados
    const card = await Card.findByPk(cardId, { include: Collection });

    if (!card) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }

    // Obter a coleção associada ao card
    const collection = card.Collection;

    if (!collection) {
      return res.status(404).json({ message: 'Coleção não encontrada' });
    }

    // Envie uma resposta adequada para o cliente
    res.status(200).json(collection);
  } catch (error) {
    console.error('Erro ao buscar coleção:', error);
    res.status(500).json({ message: 'Erro ao buscar coleção' });
  }
};

module.exports = { createCard, updateCard, deleteCard, getCollection };
