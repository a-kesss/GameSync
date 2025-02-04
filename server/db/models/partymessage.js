'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartyMessage extends Model {
    static associate(models) {
      PartyMessage.belongsTo(models.Party, { foreignKey: 'partyId' });
      PartyMessage.belongsTo(models.Message, { foreignKey: 'messageId' });
    }
  }
  PartyMessage.init(
    {
      partyId: DataTypes.INTEGER,
      messageId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'PartyMessage',
    },
  );
  return PartyMessage;
};
