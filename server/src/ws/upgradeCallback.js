require('dotenv').config();
const { WebSocketServer } = require('ws');
const cookieParser = require('cookie-parser');
const parser = cookieParser();
const jwt = require('jsonwebtoken');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

const upgradeCB = (request, socket, head) => {
  socket.on('error', (err) => console.log('ERROR IN UPGRADECB LISTENER', err));

  parser(request, {}, () => {
    try {
      const token = request.cookies.refreshToken;
      const { user } = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
      socket.removeListener('error', () => {});

      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request, user);
      });
    } catch (error) {
      console.log('ERROR ON UPGRADE', error);
      socket.write('HTTP/1.1 401 Unathorized\r\n\r\n');
      socket.destroy();
    }
  });
};

module.exports = { upgradeCB, wss };
