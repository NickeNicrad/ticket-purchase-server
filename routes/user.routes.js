const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth.middleware.js');
const {updateUserState, updatePassword, getUsers, createUser, deleteUser, updateUser, getAdmin} = require('../controllers/user.controller.js');

router.post('/create', authenticated, createUser);
router.patch('/state/update/:id', authenticated, updateUserState);
router.patch('/update/:id', authenticated, updateUser);
router.patch('/password/:id', authenticated, updatePassword);
router.delete('/delete/:id', authenticated, deleteUser);
router.get('/all', getUsers);
router.get('/admin', getAdmin);

module.exports = router;