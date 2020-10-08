const jwt = require('jsonwebtoken')

exports.checkJWT = (req, res, next) => {
    const token = req.headers.jwt

    jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if(error){
            return res.status(403).send({
                message: 'Not authorized'
            })
        }

        req.userId = decoded.id
        next()
    })
}