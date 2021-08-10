const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth.middleware.js');

const {getAllNotifications, updateNotification} = require('../controllers/notification.controller.js');

router.get('/all', getAllNotifications);
router.patch('/update/:id', authenticated, updateNotification);

module.exports = router;