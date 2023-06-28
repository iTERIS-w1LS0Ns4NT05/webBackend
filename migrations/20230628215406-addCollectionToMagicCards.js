'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('MagicCards', 'collection', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Regular'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('MagicCards', 'collection');
  }
};
