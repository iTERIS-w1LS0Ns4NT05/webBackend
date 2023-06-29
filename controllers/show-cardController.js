const { MagicCard } = require('../models');

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

async function getAllCards(req, res) {
  try {
    const { limit: reqLimit = 10, page: reqPage = 1 } = req.query;

    const validLimits = [5, 10, 30];
    const limit = parseInt(reqLimit);
    const effectiveLimit = validLimits.includes(limit) ? limit : 10;
    const page = parseInt(reqPage);
    const offset = (page - 1) * effectiveLimit;

    const { count, rows: cards } = await MagicCard.findAndCountAll({
      limit: effectiveLimit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / effectiveLimit);

    res.status(200).json({ cards, totalPages });
  } catch (error) {
    console.error('Erro ao buscar as cartas:', error);
    res.status(500).json({ message: 'Erro ao buscar as cartas' });
  }
}

const getCardByParams = async (req, res) => {
  try {
    const { type, name, collection, limit: reqLimit = 10, page: reqPage = 1 } = req.query;

    const validLimits = [5, 10, 30];
    const limit = parseInt(reqLimit);
    const effectiveLimit = validLimits.includes(limit) ? limit : 10;
    const page = parseInt(reqPage);
    const offset = (page - 1) * effectiveLimit;

    const whereCondition = {};

    if (type) {
      whereCondition.type = type;
    }
    if (name) {
      whereCondition.name = name;
    }
    if (collection) {
      whereCondition.collection = collection;
    }

    const { count, rows: cards } = await MagicCard.findAndCountAll({
      where: whereCondition,
      limit: effectiveLimit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / effectiveLimit);

    res.status(200).json({ cards, totalPages });
  } catch (error) {
    console.error('Erro ao buscar cartas:', error);
    res.status(500).json({ message: 'Erro ao buscar cartas' });
  }
};

module.exports = { getCardById, getAllCards, getCardByParams };
