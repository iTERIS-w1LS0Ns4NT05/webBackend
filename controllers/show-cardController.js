const { MagicCard } = require('../models/magiccard');

const getCardById = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar a carta pelo ID no banco de dados
    const card = await MagicCard.findByPk(id);

    if (!card) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }

    // Envie uma resposta adequada para o cliente
    res.status(200).json(card);
  } catch (error) {
    console.error('Erro ao buscar carta:', error);
    res.status(500).json({ message: 'Erro ao buscar carta' });
  }
};

const getCardByParams = async (req, res) => {
  try {
    const { type, name, collection } = req.query;

    // Verifique se há parâmetros de pesquisa
    if (!type && !name && !collection) {
      // Busque todas as cartas do banco de dados
      const cards = await MagicCard.findAll();

      // Envie uma resposta adequada para o cliente
      return res.status(200).json(cards);
    }

    // Crie um objeto de consulta com base nos parâmetros recebidos
    const query = {};
    if (type) {
      query.type = type;
    }
    if (name) {
      query.name = name;
    }
    if (collection) {
      query.collection = collection;
    }

    // Busque as cartas no banco de dados com base nos parâmetros de pesquisa
    const cards = await MagicCard.findAll({ where: query });

    // Envie uma resposta adequada para o cliente
    res.status(200).json(cards);
  } catch (error) {
    console.error('Erro ao buscar cartas:', error);
    res.status(500).json({ message: 'Erro ao buscar cartas' });
  }
};

module.exports = { getCards, getCardById, getCardByParams };

