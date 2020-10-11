const jwt = require('jsonwebtoken')

exports.checkJWT = (req, res, next) => {
    const token = req.headers.jwt

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if(error){
            return res.status(403).send({
                message: 'Not authorized'
            })
        }

        let expiresIn = decoded.iat + 60 // 2*60*60
        let now = (new Date().getTime())/1000

        if(expiresIn < now){
            return res.status(300).send({
                message: 'Renew certificate'
            })
        }

        req.userId = decoded.id
        next()
    })
}