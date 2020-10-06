const sequelize = require('../util/database')
const { Sequelize, DataTypes } = require('sequelize')
const Category = require('./Category')

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id'
        }
      }
    
}, {
    freezeTableName: true
});

Category.hasMany(Product, {
    foreignKey: 'categoryId'
})
Product.belongsTo(Category, {
    foreignKey: 'categoryId'
})




module.exports = Product