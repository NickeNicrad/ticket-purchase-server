const Boat = require('../models/boat.model.js');
const fs = require('fs');

exports.createBoat = async (req, res) => {
    const {boat_name, boat_code, capacity, boat_status} = req.body;
    try {
        const isExist = await Boat.findOne({where: {boat_name, boat_code}});
        if (isExist) throw res.status(403).json('boat already exist!');
        await Boat.create({
            boat_name,
            boat_code,
            capacity,
            boat_status,
        });
        res.status(201).json('successfully created!');
    } catch (error) {
        res.status(400).json('something went wrong: ' + error);
    }
}
exports.getAllBoats = async (req, res) => {
    try {
        const allBoats = await Boat.findAll();
        res.status(200).json(allBoats);
    } catch (error) {
        res.status(404).json('something went wrong ' + error);
    }
}

exports.updateBoat = (req, res) => {
    const {id} = req.params;
    const {boat_code, boat_name, capacity, boat_status} = req.body;
    Boat.update({
        boat_code,
        boat_name,
        boat_status,
        capacity
    }, {
        where: {id}
    })
    .then(() => res.status(201).json('successfully updated!'))
    .catch(err => res.status(404).json('something went wrong ' + err));
}

exports.deleteBoat = async (req, res) => {
    const {id} = req.params;
    await Boat.destroy({where: {id}})
        .then(() => res.status(200).json('successfully deleted!'))
        .catch(err => res.status(404).json('something went wrong' + err));
}