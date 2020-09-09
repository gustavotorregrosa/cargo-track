// const sequelize = require('../util/database')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:gustavo01@localhost:15432/cargotrack')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    instanceMethods: {
        toJSON: function () {
          var values = Object.assign({}, this.get());  
          delete values.password;
          return values;
        }
      }
})

module.exports = User