const sequelize = require('sequelize');
const {db} = require('../connector.js');

const Destinations = db.define('destinations', {
    destination: sequelize.STRING
});

module.exports = Destinations;