const sequelize = require('../util/database')
const { Sequelize, DataTypes, Model } = require('sequelize')
const Product = require('./Product')

class Moviment extends Model {}

Moviment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id'
        }
      },
    type: {
      type: DataTypes.ENUM,
      values: [
          'sell',
          'buy'
      ],
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT(10,2),
      allowNull: false,
    }
},{
    sequelize,
    modelName: 'Moviment',
    freezeTableName: true
})

Product.hasMany(Moviment, {
  foreignKey: 'productId'
})
Moviment.belongsTo(Product, {
  foreignKey: 'productId'
})

module.exports = Moviment
