const Sequelize = require('sequelize');
const {db} = require('../connector.js');

const Bonus = db.define('bonus', {
    user_id: {
        type: Sequelize.NUMBER
    },
    printed: {
        type: Sequelize.BOOLEAN
    },
    client_id: {
        type: Sequelize.NUMBER
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
        type: Sequelize.NUMBER
    },
    for_kids: {
        type: Sequelize.BOOLEAN
    },
    verification_code: {
        type: Sequelize.NUMBER
    },
    verified: {
        type: Sequelize.BOOLEAN
    },
    boat_name: {
        type: Sequelize.STRING
    },
    destination: {
        type: Sequelize.STRING
    },
    class_name: {
        type: Sequelize.STRING
    },
    departure_time: {
        type: Sequelize.TIME
    },
    arriving_time: {
        type: Sequelize.TIME
    }
});

module.exports = Bonus;