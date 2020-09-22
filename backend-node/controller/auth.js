const User = require('../model/User')
const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs');
const sequelize = require('../util/database')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');


exports.renew = (req, res, next) => {
    const email = req.body.email
    const refreshToken = req.body.refreshToken
 

    User.findOne({
        where: {
            email,
            refreshToken
        }
    }).then(completeUser => {
        let completeUserData = {
            ...completeUser.dataValues
        }
        delete completeUserData.password
        let userJWT = generateJWT(completeUserData)
        return res.send(userJWT)
    })

}




exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password


    getUser(email, password).then(user => {
        let safeUser = safeObj(user)
        getToken(safeUser).then(tokenUser => {
            let userJWT = generateJWT(tokenUser)
           return res.send(userJWT)
        })
    }).catch(e => {
            res.status(401).send({
                message: "Invalid user/password"
            })
        })
}

exports.register = (req, res, next) => {
    generateUserPassword({...req.body}).then(user => {
        return getToken(user).then(user => { 
           
            User.findOne({
                where: {
                    id: user.dataValues.id
                }
            }).then(completeUser => {
                let completeUserData = {
                    ...completeUser.dataValues
                }
                delete completeUserData.password
                let userJWT = generateJWT(completeUserData)
                return res.send(userJWT)
            })
            
        })
    }).catch(e => {
        res.status(401).send({
            message: "Error creating user"
        })
    })


}

const generateUserPassword = ({email, name, password}) => new Promise((success, reject) => {
    bcrypt.hash(password, 12).then(hashedPassword => {
        return User.create({
            email,
            name,
            password: hashedPassword,
        }).then(user => success(user)).catch(e => {
            reject(e)
        })
        
    })
})

const getUser = (email, password) => new Promise((success, reject) => {
    User.findOne({
        where: {
            email
        }
    }).then(user => {
        bcrypt.compare(password, user.password, (err, pass) => {
            if (err || !pass) {
                reject(false)
            }
            success(user)
        })
    }).catch(e => {
        reject(false)
    })
})

const safeObj = user => {
    let safeUser = {
        ...user.dataValues
    }
    delete safeUser.password
    delete safeUser.refreshToken
    delete safeUser.refreshTokenValidity
    return safeUser

}

const getToken = user => new Promise((success, reject) => {
    let refreshToken = crypto.createHash('sha1').update(
        (new Date()).valueOf().toString() + Math.random().toString()
    ).digest('hex')

    let refreshTokenValidity = new Date()
    refreshTokenValidity.setHours(refreshTokenValidity.getHours() + 2)

    User.update({
        refreshToken,
        refreshTokenValidity
    }, {
        where: {
            email: user.email
        }
    }).then(u => {
        userComplete = {
            ...user,
            refreshToken,
            refreshTokenValidity,
        }

        return success(userComplete)
    
    })

})

generateJWT = user => {
    let userData = {
        ...user
    }
    delete userData.refreshToken
    delete userData.refreshTokenValidity
    return {
        ...user,
        jwt: jwt.sign({...userData}, process.env.JWT_KEY)
    }
}
 

