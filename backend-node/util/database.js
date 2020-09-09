const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:gustavo01@postgres:5432/cargotrack')

module.export = sequelize