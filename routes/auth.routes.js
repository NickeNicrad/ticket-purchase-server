const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth.middleware.js');

const {userLogin, adminLogin, getUser, getAdmin} = require('../controllers/auth.controllers.js');

router.post('/login', userLogin);
router.get('/single', authenticated, getUser);

router.post('/admin/login', adminLogin);
router.get('/admin/single', authenticated, getAdmin);

module.exports = router;