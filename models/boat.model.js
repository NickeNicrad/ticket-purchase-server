const Sequelize = require('sequelize');
const {db} = require('../connector.js');

const Boat = db.define('boats', {
    boat_name: {
        type: Sequelize.STRING
    },
    capacity: {
        type: Sequelize.NUMBER
    },
    boat_code: {
        type: Sequelize.STRING
    },
    boat_status: {
        type: Sequelize.BOOLEAN
    },
    boat_image: {
        type: Sequelize.STRING
    }
})

module.exports = Boat;