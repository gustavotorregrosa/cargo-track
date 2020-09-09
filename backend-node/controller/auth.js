const User = require('../model/User')
const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs');
const sequelize = new Sequelize('postgres://postgres:gustavo01@localhost:15432/cargotrack')

exports.login = (req, res, next) => {
    let userEmail = req.body.email
    let password = req.body.password
    // res.send(userEmail + password)
    // User.sync().then(r => res.send("user created"))
    // sequelize.authenticate().then(r => res.send("deu certo")).catch(r => res.send(r))
    // res.send("ola mundo 123")
}


exports.register = (req, res, next) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    bcrypt.hash(password, 12).then(hashedPassword => {
        return User.create({
            email,
            name,
            password: hashedPassword
        })
    }).then(user => {
        let safeUser = {...user.dataValues}
        delete safeUser.password
        return safeUser
    }).then(user => res.send(user))
}