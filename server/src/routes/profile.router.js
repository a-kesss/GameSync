const router = require('express').Router();
const { User } = require('../../db/models');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    const plainUser = user.get({ plain: true });
    const { password, createdAt, updatedAt, email, isAdmin, ...filteredUser } = plainUser;

    res.json(filteredUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
