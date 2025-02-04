//Зависимости
require('dotenv').config();
const http = require('http');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { upgradeCB, wss } = require('./ws/upgradeCallback');
const connectionCB = require('./ws/connectionCB');

//Пути
const apiRouter = require('./routes/api.router');

//Порт http://localhost:3000
const { PORT } = process.env;

// Корса
const corsConfig = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
};
app.use(cors(corsConfig));

// middleware-функции
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Что-то типа middleware-путь
app.use('/api', apiRouter);

const server = http.createServer(app);
server.on('upgrade', upgradeCB);
wss.on('connection', connectionCB);

//Сервер
server.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
