'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MagicCard extends Model {
    static associate(models) {
      MagicCard.belongsTo(models.Collection, {
        foreignKey: 'collectionId',
        as: 'collection',
      });
    }
  }

  MagicCard.init(
    {
      name: DataTypes.STRING,
      manaCost: DataTypes.STRING,
      type: DataTypes.STRING,
      rarity: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'MagicCard',
    }
  );

  return MagicCard;
};
