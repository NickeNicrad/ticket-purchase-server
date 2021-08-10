const Sequelize = require('sequelize');
const {db} = require('../connector.js');

const Clients = db.define('clients', {
    card_id: {
        type: Sequelize.NUMBER
    },
    fname: {
        type: Sequelize.STRING
    },
    lname: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    invoice_count: {
        type: Sequelize.NUMBER
    },
    invoice_total: {
        type: Sequelize.NUMBER
    }
});

module.exports = Clients;