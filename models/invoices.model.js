const Sequelize = require('sequelize');
const {db} = require('../connector.js');

const Invoices = db.define('invoices', {
    user_id: {
        type: Sequelize.NUMBER
    },
    client_id: {
        type: Sequelize.NUMBER
    },
    boat_name: {
        type: Sequelize.STRING
    },
    class_name: {
        type: Sequelize.STRING
    },
    printed: {
        type: Sequelize.BOOLEAN
    },
    request: {
        type: Sequelize.BOOLEAN
    },
    print_request: {
        type: Sequelize.BOOLEAN
    },
    verification_code: {
        type: Sequelize.NUMBER
    },
    verified: {
        type: Sequelize.BOOLEAN
    },
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
    destination: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.NUMBER
    },
    departure_time: {
        type: Sequelize.TIME
    },
    arriving_time: {
        type: Sequelize.TIME
    },
    session: {
        type: Sequelize.STRING
    },
    for_kids: {
        type: Sequelize.BOOLEAN
    }
});

module.exports = Invoices;