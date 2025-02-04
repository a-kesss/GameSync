'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.hasMany(models.UserGame, { foreignKey: 'gameId', onDelete: 'CASCADE'  }),
        Game.hasMany(models.Party, { foreignKey: 'gameId', onDelete: 'CASCADE'  });
    }
  }
  Game.init(
    {
      gamename: DataTypes.STRING,
      genre: DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Game',
    }
  );
  return Game;
};
