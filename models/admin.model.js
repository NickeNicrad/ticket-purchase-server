const Sequelize = require('sequelize');
const {db} = require('../connector.js');

const Admin = db.define('admins', {
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
});

module.exports = Admin;