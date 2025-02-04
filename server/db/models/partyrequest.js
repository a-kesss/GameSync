'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PartyRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' }),
        this.belongsTo(models.Party, { foreignKey: 'partyId' });
    }
  }
  PartyRequest.init(
    {
      partyId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'PartyRequest',
    },
  );
  return PartyRequest;
};
