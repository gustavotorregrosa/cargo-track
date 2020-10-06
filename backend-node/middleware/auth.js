exports.checkJWT = (req, res, next) => {
    console.log("foi...")
    console.log(req.headers)
    next()
}