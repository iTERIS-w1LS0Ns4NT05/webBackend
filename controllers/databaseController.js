const { sequelize, queryInterface } = require('../models');

const installDatabase = async (req, res) => {
  try {
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: true });

    // Executa os seeders para criar e popular as tabelas
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryInterface.sequelize.transaction(async (transaction) => {
      // Inclua aqui o código para executar o seeder populateMagicCards
      await queryInterface.bulkInsert('MagicCards', [], { transaction });
      
      // Inclua aqui o código para executar o seeder populateCollection
      await queryInterface.bulkInsert('Collections', [], { transaction });
      
      // Inclua aqui o código para executar o seeder populateUsers
      await queryInterface.bulkInsert('Users', [], { transaction });

      await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { transaction });
    });

    res.status(200).json({ message: 'Instalação do banco de dados concluída com sucesso' });
  } catch (error) {
    console.error('Erro durante a instalação do banco de dados:', error);
    res.status(500).json({ message: 'Erro durante a instalação do banco de dados' });
  }
};

module.exports = { installDatabase };
