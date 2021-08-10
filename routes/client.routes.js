const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth.middleware');
const {getAllClients, getAllChildren, createClient, updateClient, createClientChild, deleteClient, deleteClientChild, updateClientChild} = require('../controllers/client.controllers');

// all clients routes
router.post('/create', authenticated, createClient);
router.get('/all', getAllClients);
router.patch('/update/:id', authenticated, updateClient);
router.delete('/delete/:id', authenticated, deleteClient);

// all clients children routes
router.post('/child/create', authenticated, createClientChild);
router.get('/child/all', getAllChildren);
router.patch('/child/update/:id', authenticated, updateClientChild);
router.delete('/child/delete/:id', authenticated, deleteClientChild);


module.exports = router;