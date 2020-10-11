const sequelize = require('../util/database')
const { Sequelize, DataTypes, Model } = require('sequelize')

class Category extends Model {}

Category.init({
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
    sequelize,
    freezeTableName: true,
    modelName: 'Category'
})

// const Category = sequelize.define('Category', {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     }
// }, {
//     freezeTableName: true
// })

module.exports = Category