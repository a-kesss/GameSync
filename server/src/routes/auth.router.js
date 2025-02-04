const router = require('express').Router();
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../../config/cookieConfig');

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [user, isCreated] = await User.findOrCreate({
      where: {
        email,
      },
      defaults: {
        username,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!isCreated) {
      res.status(400).json({ message: 'User alredy exist' });
    } else {
      const plainUser = user.get();
      delete plainUser.password;
      delete plainUser.createdAt;
      delete plainUser.updatedAt;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      res.status(401).json({ message: 'Incorrect email or password' });
    } else {
      const plainUser = user.get({ plain: true });

      delete plainUser.password;
      delete plainUser.createdAt;
      delete plainUser.updatedAt;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      res
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({ user: plainUser, accessToken });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie('refreshToken').sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
