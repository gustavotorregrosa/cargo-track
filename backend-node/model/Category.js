const sequelize = require('../util/database')
const { Sequelize, DataTypes } = require('sequelize')

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    freezeTableName: true
})

module.exports = Category