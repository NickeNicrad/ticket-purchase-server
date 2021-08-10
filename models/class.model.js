const Sequelize = require('sequelize');
const {db} = require('../connector.js');

const Classes = db.define('classes', {
    class_name: {
        type: Sequelize.STRING
    },
    capacity: {
        type: Sequelize.NUMBER
    },
    price: {
        type: Sequelize.NUMBER
    },
    kids_price: {
        type: Sequelize.NUMBER
    },
    session: {
        type: Sequelize.STRING
    }
});

module.exports = Classes;