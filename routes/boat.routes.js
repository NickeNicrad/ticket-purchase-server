const express = require('express');
// const path = require('path');
const router = express.Router();
const multer = require('multer');
const authenticated = require('../middleware/auth.middleware.js');
const {createBoat, getAllBoats, deleteBoat, updateBoat} = require('../controllers/boat.controller.js');

router.post('/new', createBoat);

router.get('/all', getAllBoats);

router.patch('/update/:id', authenticated, updateBoat);

router.delete('/delete/:id', authenticated, deleteBoat);

module.exports = router;