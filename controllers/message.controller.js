const Admin = require('../models/admin.model.js');
const User = require('../models/user.model.js');
const Messages = require('../models/message.model.js');

exports.createMessage = async (req, res) => {
    const {msgContent, uid1, uid2} = req.body;
    try {
        await Messages.create({
            uid1,
            uid2,
            msg: msgContent
        })
        res.status(201).json('message successfully sent!');
    } catch (error) {
        res.status(400).json('something went wrong! ' + error);
    }
}
exports.getAllChats = async (req, res) => {
    try {
        const all = await Messages.findAll();
        res.status(200).json(all);
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.deleteMessage = (req, res) => {
    const {id} = req.params;
    Messages.destroy({
        where: {id}
    })
    .then(() => res.status(200).json('successfully deleted!'))
    .catch(err => res.status(404).json('something went wrong ' + err));
}