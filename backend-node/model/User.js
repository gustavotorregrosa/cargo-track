const sequelize = require('../util/database')
const { Sequelize, DataTypes, Model } = require('sequelize')

class User extends Model {}

User.init({
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
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        
    },
    refreshTokenValidity: {
        type: DataTypes.DATE,
        
    }

}, {
    sequelize,
    modelName: 'User',
    freezeTableName: true,
    instanceMethods: {
        toJSON: function () {
          var values = Object.assign({}, this.get());  
          delete values.password;
          return values;
        }
      },

})

// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: Sequelize.UUIDV4,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     refreshToken: {
//         type: DataTypes.STRING,
        
//     },
//     refreshTokenValidity: {
//         type: DataTypes.DATE,
        
//     },
// }, {
//     instanceMethods: {
//         toJSON: function () {
//           var values = Object.assign({}, this.get());  
//           delete values.password;
//           return values;
//         }
//       },
     
//     freezeTableName: true
    
// })


module.exports = User