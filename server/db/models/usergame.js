'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    static associate(models) {
      UserGame.belongsTo(models.User, { foreignKey: 'userId' }),
      UserGame.belongsTo(models.Game, { foreignKey: 'gameId' });
    }
  }
  UserGame.init(
    {
      userId: DataTypes.INTEGER,
      gameId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserGame',
    }
  );
  return UserGame;
};
