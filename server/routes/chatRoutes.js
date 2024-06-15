const express = require('express');
const { getChatMessages, saveChatMessage, getUsers } = require('../controllers/chatController');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

router.get('/search/:query', authenticate, getUsers);
router.get('/:room', authenticate, getChatMessages);
router.post('/', authenticate, saveChatMessage);

module.exports = router;
