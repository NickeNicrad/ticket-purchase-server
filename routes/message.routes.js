const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth.middleware.js');
const {getAllChats, createMessage, deleteMessage} = require('../controllers/message.controller.js');

// all conversation routes
router.post('/create', authenticated, createMessage);
router.get('/all', getAllChats);
router.delete('/delete/:id', authenticated, deleteMessage);

module.exports = router;