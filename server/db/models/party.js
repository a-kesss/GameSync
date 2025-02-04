'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Party extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'ownerId' }),
      this.belongsTo(models.Game, { foreignKey: 'gameId', onDelete: 'CASCADE' }),
        this.hasMany(models.Partymember, { foreignKey: 'partyId', onDelete: 'CASCADE' }),
        this.hasMany(models.PartyMessage, { foreignKey: 'partyId', onDelete: 'CASCADE' });
        this.hasMany(models.PartyRequest, { foreignKey: 'partyId', onDelete: 'CASCADE' });
    }
  }
  Party.init(
    {
      ownerId: DataTypes.INTEGER,
      gameId: DataTypes.INTEGER,
      description: DataTypes.STRING,
      language: DataTypes.STRING,
      age: DataTypes.INTEGER,
      maxmembers: DataTypes.INTEGER,
      private: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Party',
    },
  );
  return Party;
};
