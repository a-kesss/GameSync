'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Party, { foreignKey: 'ownerId' }),
        this.hasMany(models.UserGame, { foreignKey: 'userId' }),
        this.hasMany(models.Partymember, { foreignKey: 'memberId' }),
        this.hasMany(models.Message, { foreignKey: 'authorId' });
      this.hasMany(models.PartyRequest, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
      image: DataTypes.TEXT,
      info: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
