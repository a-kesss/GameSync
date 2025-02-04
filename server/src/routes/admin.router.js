const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { verifyAccessToken } = require('../middleware/verifyToken'); // Импортируем middleware для проверки access token
const {
  Game,
  UserGame,
  Party,
  Partymember,
  PartyMessage,
  PartyRequest,
  Message,
} = require('../../db/models');
const fs = require('fs');

const uploadDir = path.resolve(__dirname, '../../public/images');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.use(verifyAccessToken);

// Маршрут для создания новой карточки игры
router.post('/add', upload.single('img'), async (req, res) => {
  const { gamename, genre, description } = req.body;
  const imgPath = req.file ? `${req.file.filename}` : null;

  // Создаем новую карточку игры в базе данных
  try {
    await Game.create({
      gamename,
      genre,
      description,
      image: imgPath,
    });
    res.status(201).json({ message: 'Карточка игры успешно создана' });
  } catch (error) {
    res.status(500).json({
      message: 'Ошибка при создании карточки игры',
      error: error.message,
    });
  }
});

router.delete('/delete/:gameId', async (req, res) => {
  const { gameId } = req.params;
  try {
    const parties = await Party.findAll({
      where: { gameId },
    });
    const partyIds = parties.map((party) => party.id);
    const partyMessages = await PartyMessage.findAll({
      where: { partyId: partyIds },
    });
    const messageIds = partyMessages.map((pm) => pm.messageId);
    await PartyRequest.destroy({
      where: { partyId: partyIds },
    });
    await PartyMessage.destroy({
      where: { partyId: partyIds },
    });
    await Message.destroy({
      where: { id: messageIds },
    });
    await Partymember.destroy({
      where: { partyId: partyIds },
    });
    await Party.destroy({
      where: { gameId },
    });
    await UserGame.destroy({
      where: { gameId },
    });
    await Game.destroy({
      where: { id: gameId },
    });
    res.status(200).json({ message: 'Game and related data successfully deleted' });
  } catch (error) {
    console.log('🚀 ~ router.delete ~ error:', error);
    res.status(500).json({
      message: 'Error deleting game and related data',
      error: error.message,
    });
  }
});

module.exports = router;
