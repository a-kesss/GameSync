const { Message, User, PartyMessage, Party } = require('../../db/models');

const map = new Map();

const connectionCB = (socket, request, userFromJwt) => {
  map.set(userFromJwt.id, { ws: socket, user: userFromJwt });

  map.forEach(({ ws }) => {
    ws.send(
      JSON.stringify({
        type: 'ADD_USERS_FROM_SERVER',
        payload: [...map.values()].map((el) => el.user),
      }),
    );
  });

  socket.on('message', async (data) => {
    const { type, payload, lobby } = JSON.parse(data);

    switch (type) {
      case 'ADD_MESSAGE_FROM_CLIENT':
        const newMessage = await Message.create({
          text: payload,
          authorId: userFromJwt.id,
        });
        const newPartyMessage = await PartyMessage.create({
          partyId: lobby,
          messageId: newMessage.id,
        });
        const messageWithUser = await Message.findByPk(newMessage.id, {
          include: {
            model: User,
            attributes: ['id', 'username', 'image'],
          },
        });

        messageWithUser.dataValues.lobbyId = lobby;

        map.forEach(({ ws }) => {
          ws.send(
            JSON.stringify({
              type: 'ADD_MESSAGE_FROM_SERVER',
              payload: messageWithUser,
            }),
          );
        });
        break;

        case 'DELETE_MESSAGE_FROM_CLIENT':
          try {
            const message = await Message.findByPk(payload);
            
            if (!message) {
              throw new Error('Message not found');
            }
        

            const partyMessage = await PartyMessage.findOne({
              where: { messageId: payload }
            });
        

            if (message.authorId !== userFromJwt.id && !userFromJwt.isAdmin) {
              throw new Error('Unauthorized to delete this message');
            }
        

            await PartyMessage.destroy({
              where: { messageId: payload }
            });
        

            await Message.destroy({
              where: { id: payload }
            });
        

            map.forEach(({ ws }) => {
              ws.send(
                JSON.stringify({
                  type: 'DELETE_MESSAGE_FROM_SERVER',
                  payload: {
                    messageId: payload,
                    partyId: partyMessage.partyId
                  }
                }),
              );
            });
          } catch (error) {
            socket.send(
              JSON.stringify({
                type: 'ERROR_FROM_SERVER',
                payload: error.message
              })
            );
          }
          break;

      default:
        break;
    }
  });

  socket.on('close', () => {
    map.delete(userFromJwt.id);
    map.forEach(({ ws }) => {
      ws.send(
        JSON.stringify({
          type: 'ADD_USERS_FROM_SERVER',
          payload: [...map.values()].map((el) => el.user),
        }),
      );
    });
  });
};

module.exports = connectionCB;