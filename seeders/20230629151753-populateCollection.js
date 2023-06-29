'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adicionar as siglas à tabela de coleções
    await queryInterface.bulkInsert('Collections', [
      {
        id: 1,
        name: 'AFR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'CLB',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'STX',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'MH2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'AFC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remover as siglas da tabela de coleções
    await queryInterface.bulkDelete('Collections', { id: [1, 2, 3, 4, 5] });
  },
};
