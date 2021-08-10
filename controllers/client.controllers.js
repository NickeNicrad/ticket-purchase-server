const Child = require('../models/child.model.js');
const Clients = require('../models/client.model.js');

exports.createClient = async (req, res) => {
    const {card_id, fname, lname, phone} = req.body;
    try {
        // testing all fields before to submit
        if(!card_id || !fname || !lname || !phone) throw res.status(400).json('please fill all fields before to continue');
        const client = await Clients.findOne({where: {card_id}});
        // testing an existing user ID
        if (client === true) throw res.status(400).json('user ID already exist');
        await Clients.create({
            card_id,
            fname,
            lname,
            phone,
            invoice_count: 0,
            invoice_total: 0,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        .then(()=>res.status(201).json('successfully saved!'))
        .catch(err => res.status(409).json(err));
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getAllClients = async (req, res) => {
    try {
        const allClients = await Clients.findAll();
        res.status(200).json(allClients);
    } catch (error) {
        res.status(404).json(error.response);
    }
}

exports.updateClient = (req, res) => {
    const {id} = req.params;
    const {card_id, fname, lname, phone} = req.body;
    
    Clients.update({
        card_id,
        fname,
        lname,
        phone
    }, {
        where: {id}
    })
    .then(() => res.status(200).json('successfully updated!'))
    .catch(err => res.status(400).json('something went wrong ' + err));
}

exports.deleteClient = async (req, res) => {
    const {id} = req.params;
    await Clients.destroy({
        where: {id}
    })
    .then(() => {
        res.status(200).json('succesfully deleted!')
        Child.destroy({
            where: {client_id: id}
        })
        .then(() => res.status(200).json('succesfully deleted!'))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
}

exports.deleteClientChild = async (req, res) => {
    const {id} = req.params;
    await Child.destroy({
        where: {id}
    })
    .then(() => res.status(200).json('succesfully deleted!'))
    .catch(err => res.status(400).json(err));
}

exports.createClientChild = async (req, res) => {
    const {card_id, client_id, fname, lname, phone} = req.body;
    try {
        // testing all fields before to submit
        if(!card_id || !client_id || !fname || !lname || !phone) throw res.status(400).json('please fill all fields');
        const child = await Child.findOne({where: {card_id}});
        // testing an existing user ID
        if (child) return res.status(400).json('user ID already exist');
        await Child.create({
            card_id,
            client_id,
            fname,
            lname,
            phone,
            invoice_count: 0,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        .then(()=>res.status(201).json('successfully saved!'))
        .catch(err => res.status(409).json(err));
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.getAllChildren = async (req, res) => {
    try {
        const allChildren = await Child.findAll();
        res.status(200).json(allChildren);
    } catch (error) {
        res.status(404).json(error.response);
    }
}

exports.updateClientChild = (req, res) =>{
    const {id} = req.params;
    const {card_id, fname, lname, phone} = req.body;

    Child.update({
        card_id,
        fname,
        lname,
        phone
    }, {
        where: {id}
    })
    .then(() => res.status(200).json('successfully updated'))
    .catch((err) => res.status(400).json('something went wrong: ' + err));
}