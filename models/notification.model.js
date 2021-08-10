const sequelize = require('sequelize');
const {db} = require('../connector');

const Notifications = db.define('notifications', {
    user_id: sequelize.NUMBER,
    username: sequelize.STRING,
    title: sequelize.STRING,
    content: sequelize.STRING,
    content_id: sequelize.NUMBER,
    isSent: sequelize.BOOLEAN,
    createdAt: sequelize.DATE,
    updatedAt: sequelize.DATE
});

module.exports = Notifications