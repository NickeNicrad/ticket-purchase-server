const Sequelize = require('sequelize');
const {db} = require('../connector.js');

const Child = db.define('children', {
    fname: {
        type: Sequelize.STRING
    },
    lname: {
        type: Sequelize.STRING
    },
    card_id: {
        type: Sequelize.NUMBER
    },
    client_id: {
        type: Sequelize.NUMBER
    },
    phone: {
        type: Sequelize.STRING
    },
    invoice_count: {
        type: Sequelize.NUMBER
    }
})

module.exports = Child;