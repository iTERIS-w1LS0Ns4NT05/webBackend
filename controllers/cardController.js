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


module.exports = { createUser };
