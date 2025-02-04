const router = require('express').Router();
const { Party } = require('../../db/models');
const { Partymember } = require('../../db/models');
const { User } = require('../../db/models');
const { PartyRequest } = require('../../db/models/');
const { Game } = require('../../db/models/');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const partyData = await Party.findAll({
      where: { gameId: id },
      include: [
        {
          model: Partymember,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: User,
              attributes: {
                exclude: [
                  'password',
                  'createdAt',
                  'updatedAt',
                  'email',
                  'isAdmin',
                  'info',
                ],
              },
            },
          ],
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'email', 'isAdmin', 'info'],
          },
        },
      ],
    });

    const filteredPartyData = partyData.map((party) => {
      const plainPartyData = party.get({ plain: true });

      const filteredMembers = plainPartyData.Partymembers.map((member) => {
        const plainUser = member.User;

        const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredUser } =
          plainUser;
        return filteredUser;
      });

      const owner = plainPartyData.User;
      const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredOwner } =
        owner;

      return {
        maxmembers: plainPartyData.maxmembers,
        private: plainPartyData.private,
        id: plainPartyData.id,
        members: filteredMembers,
        owner: filteredOwner,
      };
    });

    res.status(200).json(filteredPartyData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.post('/add', async (req, res) => {
  const { age, description, gameId, private, language, maxmembers, ownerId } = req.body;

  try {
    const created = await Party.create({
      ownerId,
      gameId,
      description,
      language,
      age,
      maxmembers,
      private,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const plained = created.get({ plain: true });

    const partyData = await Party.findOne({
      where: { id: plained.id },
      include: [
        {
          model: Partymember,
          include: [User],
        },
        {
          model: User,
        },
      ],
    });

    const plainPartyData = partyData.get({ plain: true });

    const filteredMembers = plainPartyData.Partymembers.map((member) => {
      const plainUser = member.User;
      const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredUser } =
        plainUser;
      return filteredUser;
    });

    const owner = plainPartyData.User;
    const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredOwner } =
      owner;

    const result = {
      maxmembers: plainPartyData.maxmembers,
      private: plainPartyData.private,
      id: plainPartyData.id,
      members: filteredMembers,
      owner: filteredOwner,
    };

    res.status(201).json({ message: 'Лобби успешно создано', party: result });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.get('/lobby/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const partyData = await Party.findOne({
      where: { id: id },
      include: [
        {
          model: Partymember,
          include: [User],
        },
        {
          model: User,
        },
      ],
    });

    const plainPartyData = partyData.get({ plain: true });

    const filteredMembers = plainPartyData.Partymembers.map((member) => {
      const plainUser = member.User;
      const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredUser } =
        plainUser;
      return filteredUser;
    });

    const owner = plainPartyData.User;
    const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredOwner } =
      owner;

    const result = {
      maxmembers: plainPartyData.maxmembers,
      private: plainPartyData.private,
      id: plainPartyData.id,
      members: filteredMembers,
      owner: filteredOwner,
    };

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.post('/join', async (req, res) => {
  const { memberId, partyId } = req.body;

  try {
    const partyData = await Party.findOne({
      where: { id: partyId },
      include: [
        {
          model: Partymember,
          include: [User],
        },
        {
          model: User,
        },
      ],
    });
    const plained = partyData.get({ plain: true });

    const membersInThisParty = plained.Partymembers.length + 1;

    if (memberId === 0) {
      return res.json({ message: 'Вы не вошли в профиль', error: true });
    } else if (
      partyData.Partymembers.some((member) => member.memberId === Number(memberId)) ||
      partyData.ownerId === Number(memberId)
    ) {
      return res.json({ message: 'Вы уже в лобби', error: true });
    } else if (membersInThisParty >= partyData.maxmembers) {
      return res.json({ message: 'Лобби заполнено', error: true });
    }

    const created = await Partymember.create({
      memberId,
      partyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const changedParty = await Party.findOne({
      where: { id: created.partyId },
      include: [
        {
          model: Partymember,
          include: [User],
        },
        {
          model: User,
        },
      ],
    });

    const plainPartyData = changedParty.get({ plain: true });

    const filteredMembers = plainPartyData.Partymembers.map((member) => {
      const plainUser = member.User;
      const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredUser } =
        plainUser;
      return filteredUser;
    });

    const owner = plainPartyData.User;
    const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredOwner } =
      owner;

    const result = {
      maxmembers: plainPartyData.maxmembers,
      private: plainPartyData.private,
      id: plainPartyData.id,
      members: filteredMembers,
      owner: filteredOwner,
    };

    res.status(201).json({ message: 'Вы успешно присоединились к лобби', party: result });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const partyData = await Party.findAll({
      include: [
        {
          model: Partymember,
          include: [User],
        },
        {
          model: User,
        },
      ],
    });

    const filteredPartyData = partyData
      .map((party) => {
        const plainPartyData = party.get({ plain: true });

        const filteredMembers = plainPartyData.Partymembers.map((member) => {
          const plainUser = member.User;
          const {
            password,
            createdAt,
            updatedAt,
            email,
            isAdmin,
            info,
            ...filteredUser
          } = plainUser;
          return filteredUser;
        });

        const owner = plainPartyData.User;
        const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredOwner } =
          owner;

        return {
          maxmembers: plainPartyData.maxmembers,
          private: plainPartyData.private,
          id: plainPartyData.id,
          members: filteredMembers,
          owner: filteredOwner,
        };
      })
      .filter((el) => {
        return (
          el.members.some((member) => member.id === Number(id)) ||
          el.owner.id === Number(id)
        );
      });

    res.status(200).json(filteredPartyData);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.post('/sendRequest', async (req, res) => {
  const { userId, partyId } = req.body;

  try {
    const created = await PartyRequest.create({
      userId,
      partyId,
      accepted: false,
    });

    res.status(201).json({ message: 'Запрос отправлен', request: created });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.get('/requests/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const requests = await PartyRequest.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Party,
          where: { ownerId: id },
          attributes: ['ownerId'],
        },
        {
          model: User,
          attributes: {
            exclude: ['password', 'isAdmin', 'createdAt', 'updatedAt', 'info', 'email'],
          },
        },
      ],
    });

    const maped = requests.map((request) => {
      const plained = request.get({ plain: true });

      const result = {
        id: plained.id,
        partyId: plained.partyId,
        userId: plained.userId,
        accepted: plained.accepted,
        user: plained.User,
      };
      return result;
    });

    res.status(200).json(maped);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.put('/requests/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
    const request = await PartyRequest.findOne({
      where: { id },
    });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Update directly using the update method
    await request.update({
      accepted: true, // Changed to false since this is a reject route
    });

    // Fetch the updated request to send back
    const updatedRequest = await request.reload();

    res.status(200).json({
      message: 'Запрос успешно отклонен',
      request: updatedRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.get('/requests/game/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const requests = await PartyRequest.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: Party,
          where: { gameId: id },
          attributes: ['ownerId'],
        },
      ],
    });

    const maped = requests.map((request) => {
      const plained = request.get({ plain: true });

      const result = {
        id: plained.id,
        partyId: plained.partyId,
        userId: plained.userId,
        accepted: plained.accepted,
        user: plained.User,
      };
      return result;
    });

    res.status(200).json(maped);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.put('/requests/:id/accept', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the request with party and user information
    const request = await PartyRequest.findOne({
      where: { id },
      include: [{ model: Party }, { model: User }],
    });

    const resultrequest = await PartyRequest.findOne({
      where: { id },
    });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Get the party details
    const party = await Party.findOne({
      where: { id: request.partyId },
      include: [{ model: User }], // Include users to count current members
    });

    const partyMemebers = await Partymember.findAll({
      where: { partyId: request.partyId },
    });

    if (!party) {
      return res.status(404).json({ message: 'Party not found' });
    }

    // Check if party is full

    if (partyMemebers.length >= party.maxmembers - 1) {
      return res.status(400).json({ message: 'Party is already full' });
    }

    // Add user to party (assuming you have a junction table PartyUsers)
    await Partymember.create({
      memberId: request.userId,
      partyId: request.partyId,
    });

    const partyData = await Party.findOne({
      where: { id: request.partyId },
      include: [
        {
          model: Partymember,
          include: [User],
        },
        {
          model: User,
        },
      ],
    });

    const plainPartyData = partyData.get({ plain: true });

    const filteredMembers = plainPartyData.Partymembers.map((member) => {
      const plainUser = member.User;

      const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredUser } =
        plainUser;
      return filteredUser;
    });

    const owner = plainPartyData.User;
    const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredOwner } =
      owner;

    const result = {
      maxmembers: plainPartyData.maxmembers,
      private: plainPartyData.private,
      id: plainPartyData.id,
      members: filteredMembers,
      owner: filteredOwner,
    };

    // Optional: Delete the request since it's been processed
    await request.destroy();

    res.status(200).json({
      message: 'Запрос успешно принят',
      party: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

router.get('/details/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const partyData = await Party.findOne({
      where: { id },
      include: [
        {
          model: Game,
          attributes: ['id', 'gamename', 'description', 'image'], // Атрибуты игры
        },
        {
          model: Partymember,
          include: [User],
        },
        {
          model: User, // Владелец лобби
        },
      ],
    });

    if (!partyData) {
      return res.status(404).json({ message: 'Лобби не найдено' });
    }

    const plainPartyData = partyData.get({ plain: true });

    // Получаем отфильтрованных участников
    const filteredMembers = plainPartyData.Partymembers.map((member) => {
      const plainUser = member.User;
      const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredUser } =
        plainUser;
      return filteredUser;
    });

    // Данные владельца
    const owner = plainPartyData.User;
    const { password, createdAt, updatedAt, email, isAdmin, info, ...filteredOwner } =
      owner;

    // Данные игры
    const game = plainPartyData.Game;

    const result = {
      game, // Информация об игре
      party: {
        id: plainPartyData.id,
        maxmembers: plainPartyData.maxmembers,
        private: plainPartyData.private,
        description: plainPartyData.description,
        language: plainPartyData.language,
        age: plainPartyData.age,
        members: filteredMembers,
        owner: filteredOwner,
      },
    };

    res.status(200).json(result);
  } catch (err) {
    console.error('Ошибка получения данных лобби:', err);
    res.status(500).json({ message: 'Ошибка сервера', error: err.message });
  }
});

router.post('/leave', async (req, res) => {
  const { memberId, partyId } = req.body;

  try {
    const partyMember = await Partymember.findOne({
      where: { memberId: memberId, partyId },
    });

    if (!partyMember) {
      return res.status(404).json({ message: 'User is not a member of the party' });
    }

    await partyMember.destroy();

    res.status(200).json({ message: 'User has left the party' });
  } catch (err) {
    console.error('Error leaving party:', err);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
