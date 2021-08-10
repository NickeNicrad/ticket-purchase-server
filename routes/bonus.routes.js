const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth.middleware.js');
const {bonusVerification, updateBonus, getAllBonus} = require('../controllers/bonus.controller.js');

router.post('/verify', authenticated, bonusVerification);

router.patch('/update/:id', authenticated, updateBonus);

router.get('/all', getAllBonus);

module.exports = router;