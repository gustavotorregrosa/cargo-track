const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://postgres:gustavo01@db:5432/cargotrack')

module.exports = sequelize