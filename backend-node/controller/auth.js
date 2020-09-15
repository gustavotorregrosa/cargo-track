const User = require('../model/User')
const {Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs');
const sequelize = require('../util/database')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

exports.login = (req, res, next) => {
    const userEmail = req.body.email
    const password = req.body.password
    const errorMsg = 'Invalid user/password'
    User.findOne({
        where: {
            email: userEmail
        }
    }).then(user => {
        return new Promise((resolve, error) => {
            bcrypt.compare(password ,user.password, (err, success) => {
                if(err){
                    throw new Error(errorMsg)
                }

                resolve(user)
            })
        })
    }).
    
    then(user => {
        if(!user) {
            throw new Error(errorMsg)
        }
        let userFound = {
            ...user.dataValues,
        }
        delete userFound.password
        userFound.jwt = jwt.sign({...userFound},'gustavo', {
            expiresIn: 500
        })
        let refreshToken = crypto.createHash('sha1').update(
            (new Date()).valueOf().toString() + Math.random().toString()
        ).digest('hex')
        userFound.refreshToken = refreshToken
        let refreshTokenValidity = new Date()
        refreshTokenValidity.setHours(refreshTokenValidity.getHours() + 2)
    
        return new Promise((success, reject) => {
            User.update({
                refreshToken,
                refreshTokenValidity
            }, {where: {
                email: userEmail
            }}).then(user => success(userFound) )

        })

       
    
    })
    .then(user => {
        res.send(user)
    }).    
    catch(e => {
        res.send(e.message)
    })
}


exports.register = (req, res, next) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    
    bcrypt.hash(password, 12).then(hashedPassword => {
        let refreshToken
        refreshToken = crypto.createHash('sha1').update(
            (new Date()).valueOf().toString() + Math.random().toString()
        ).digest('hex')

        let refreshTokenValidity = new Date()
        refreshTokenValidity.setHours(refreshTokenValidity.getHours() + 2)
        
        return User.create({
            email,
            name,
            password: hashedPassword,
            refreshToken,
            refreshTokenValidity

        })
    }).then(user => {
        let safeUser = {
            ...user.dataValues
        }
        delete safeUser.password
        safeUser.jwt = jwt.sign({...safeUser},'gustavo', {
            expiresIn: 500
        })
        return safeUser
    }).then(user => res.send(user))
}

