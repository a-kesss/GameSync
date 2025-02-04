const router = require('express').Router();
const authRouter = require('./auth.router');
const tokenRouter = require('./token.router');
const gamesRouter = require('./games.router');
const partyRouter = require('./party.router');
const adminRouter = require('./admin.router');
const editRouter = require('./edit.router');
const messageRouter = require('./messages.api.router');
const profileRouter = require('./profile.router');

router.use('/auth', authRouter);
router.use('/token', tokenRouter);
router.use('/admin', adminRouter);
router.use('/games', gamesRouter);
router.use('/party', partyRouter);
router.use('/edit', editRouter);
router.use('/messages', messageRouter);
router.use('/profile', profileRouter);

module.exports = router;
