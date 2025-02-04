'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Partymember extends Model {
    static associate(models) {
      Partymember.belongsTo(models.User, { foreignKey: 'memberId' }),
        Partymember.belongsTo(models.Party, { foreignKey: 'partyId', onDelete: 'CASCADE' });
    }
  }
  Partymember.init(
    {
      memberId: DataTypes.INTEGER,
      partyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Partymember',
    },
  );
  return Partymember;
};
