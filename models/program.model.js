const Sequelize = require('sequelize');
const {db} = require('../connector.js');

const Program = db.define('programs', {
    boat_name: {
        type: Sequelize.STRING
    },
    destination: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    },
    arriving_time: {
        type: Sequelize.TIME
    },
    departure_time: {
        type: Sequelize.TIME
    },
});

module.exports = Program;