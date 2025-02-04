const router = require('express').Router();
const { User, UserGame, Game } = require('../../db/models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../../config/cookieConfig');

const uploadDir = path.resolve(__dirname, '../../public/images');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.put('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { username, email, info } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // Удаляем старую фотографию, если загружается новая
    if (req.file && user.image) {
      const oldImagePath = path.join(uploadDir, user.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    const updatedUser = await user.update({
      username: username || user.username,
      email: email || user.email,
      info: info || user.info,
      image: req.file ? `${req.file.filename}` : user.image,
    });

    const result = {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      info: updatedUser.info,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
    };
    const { accessToken, refreshToken } = generateToken({ user: updatedUser });
    res.status(200).cookie('refreshToken', refreshToken, cookieConfig.refresh).json({
      message: 'Профиль успешно обновлен',
      user: result,
      accessToken,
    });
  } catch (error) {
    console.error('Ошибка обновления профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.get('/:id/games', async (req, res) => {
  const { id } = req.params;
  try {
    const userGames = await UserGame.findAll({
      where: { userId: id },
      include: [
        {
          model: Game,
          attributes: ['id', 'gamename', 'image'],
        },
      ],
    });
    const games = userGames.map((userGame) => userGame.Game);
    res.status(200).json(games);
  } catch (error) {
    console.error('Ошибка получения игр пользователя:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.delete('/:userId/games/:gameId', async (req, res) => {
  const { userId, gameId } = req.params;
  try {
    const userGame = await UserGame.findOne({
      where: { userId, gameId },
    });
    await userGame.destroy();
    res.status(200).json({ message: 'Игра успешно удалена у пользователя' });
  } catch (error) {
    console.error('Ошибка удаления игры у пользователя:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

router.post('/:userId/games', async (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;
  try {
    const existingUserGame = await UserGame.findOne({
      where: { userId, gameId },
    });
    if (existingUserGame) {
      return res.status(400).json({ message: 'Игра уже добавлена пользователю' });
    }
    const newUserGame = await UserGame.create({
      userId,
      gameId,
    });
    res.status(201).json(newUserGame);
  } catch (error) {
    console.error('Ошибка добавления игры пользователю:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
