'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('MagicCards', 'collectionId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Collections',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('MagicCards', 'collectionId');
  }
};
