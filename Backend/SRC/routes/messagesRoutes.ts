const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messagesController');

router.post('/newMessage', messageController.sendMessage);
router.get('/allMessages', messageController.getAllMessages);
router.get('/getMessage/:userId', messageController.getMessageById);
router.delete('/deleteMessage/:userId', messageController.deleteMessage);

module.exports = router;