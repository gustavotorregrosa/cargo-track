const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:gustavo01@localhost:15432/cargotrack')

module.exports = sequelize