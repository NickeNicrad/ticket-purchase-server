const sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});

exports.db = new sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,

    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
});