const sequelize = require('sequelize');
const {db} = require('../connector.js');

const Messages = db.define('messages', {
    uid1: sequelize.NUMBER,
    uid2: sequelize.NUMBER,
    msg: sequelize.STRING
});

module.exports = Messages;