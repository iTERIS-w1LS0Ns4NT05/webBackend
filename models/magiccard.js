'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MagicCard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MagicCard.init({
    name: DataTypes.STRING,
    manaCost: DataTypes.STRING,
    type: DataTypes.STRING,
    rarity: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MagicCard',
  });
  return MagicCard;
};