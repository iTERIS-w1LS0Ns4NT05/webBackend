'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    static associate(models) {
      // Defina as associações de modelo aqui
      Collection.hasMany(models.MagicCard, {
        foreignKey: 'collectionId',
        as: 'cards',
      });
    }
  }

  Collection.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Collection',
    }
  );

  return Collection;
};

