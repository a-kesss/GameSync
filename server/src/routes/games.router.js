const router = require('express').Router();
const { Game } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    const gameData = await Game.findAll();
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id);
    if (!gameData) {
      res.status(404).json({ message: 'No game found with this id!' });
      return;
    }
    res.status(200).json(gameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/image/:id', async (req, res) => {
  try {
    const gameData = await Game.findOne({ where: { image: req.params.id } });
    if (!gameData) {
      res.status(404).json({ message: 'No game found with this id!' });
      return;
    }
    res
      .status(200)
      .sendFile(`D:/A elbrus/phase3/GamerHub/server/public/images/${gameData.image}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
