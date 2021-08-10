const Sequelize = require('sequelize');
const {db} = require('../connector.js');

const User = db.define('User', {
    fname: {
        type: Sequelize.STRING
    },
    lname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    about: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.BOOLEAN
    },
    sold_invoices: {
        type: Sequelize.NUMBER
    }
});

module.exports = User;