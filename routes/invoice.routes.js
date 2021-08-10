const express = require('express');
const router = express.Router();
const authenticated = require('../middleware/auth.middleware.js');
const {
    createInvoice,
    getProgram,
    getAllPrograms,
    getAllClasses,
    getAllInvoices,
    getAllDestinations,
    createProgram,
    deleteProgram,
    createClass,
    updateClass,
    deleteClass,
    updateInvoice,
    deleteInvoice,
    InvoiceVerification
} = require('../controllers/invoice.controller.js');

// invoices routes
router.post('/create', authenticated, createInvoice);
router.get('/all', getAllInvoices);
router.post('/verify', authenticated, InvoiceVerification);
router.patch('/update/:id', authenticated, updateInvoice);
router.delete('/delete/:id', authenticated, deleteInvoice);

// program routes
router.post('/program/create', authenticated, createProgram);
router.post('/program/single', getProgram);
router.get('/program/all', getAllPrograms);
router.delete('/program/delete/:id', authenticated, deleteProgram);

// class routes
router.post('/class/create', authenticated, createClass);
router.get('/class/all', getAllClasses);
router.patch('/class/update/:id', authenticated, updateClass);
router.delete('/class/delete/:id', authenticated, deleteClass);

// destination routes
router.get('/destination/all', getAllDestinations);

module.exports = router;