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
    const { type, name, collection, limit = 10, page = 1 } = req.query;

    // Validar o valor de limite
    const validLimits = [5, 10, 30];
    const selectedLimit = parseInt(limit);
    const effectiveLimit = validLimits.includes(selectedLimit) ? selectedLimit : 10;

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

    // Calcular o valor de deslocamento (offset) com base na página atual
    const offset = (page - 1) * effectiveLimit;

    // Busque as cartas no banco de dados com base nos parâmetros de pesquisa e paginacao
    const cards = await MagicCard.findAll({
      where: query,
      limit: effectiveLimit,
      offset: offset,
    });

    // Envie uma resposta adequada para o cliente
    res.status(200).json(cards);
  } catch (error) {
    console.error('Erro ao buscar cartas:', error);
    res.status(500).json({ message: 'Erro ao buscar cartas' });
  }
};

module.exports = { getCardById, getCardByParams };
