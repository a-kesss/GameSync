const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User, PartyMessage }) {
      this.belongsTo(User, { foreignKey: 'authorId' }),
        this.hasMany(PartyMessage, { foreignKey: 'messageId' });
    }
  }
  Message.init(
    {
      text: DataTypes.TEXT,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Message',
    },
  );
  return Message;
};
