const { Router } = require('express');
const { Message, User, PartyMessage, Partymember, Party } = require('../../db/models');

const router = Router();

router.get('/lobby/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const parties = await Party.findAll({ where: { id } });
    parties.length > 0 ? res.send(true) : res.send(false);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const messages = await Message.findAll({
      include: [
        {
          model: PartyMessage,
          required: true,
          where: { partyId: id },
        },
        {
          model: User,
        },
      ],
    });
    const maped = messages.map((el) => {
      const plained = el.get({ plain: true });
      return {
        id: plained.id,
        text: plained.text,
        authorId: plained.authorId,
        username: plained.User.username,
        userImage: plained.User.image,
      };
    });
    res.json(maped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const owner = await Party.findOne({ where: { id }, include: { model: User } });

    const users = await Partymember.findAll({
      where: { partyId: id },
      include: {
        model: User,
      },
    });

    users.push(owner);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Message.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
