const { verifyToken } = require("../utils/jwt")

module.exports = (req, res, next) => {
    const authorization = req.header('Authorization')

    if (!authorization) {
        res.status(401).json({ error: 'missing authorization token' })
        return
    }

    const [type, token] = authorization.split(' ')
    if (!token || type !== 'Bearer') {
        res.status(401).json({ error: 'invalid token' })
        return
    }

    const payload = verifyToken(token)
    console.log(token);

    if (!payload) {
        res.status(401).json({ error: 'invalid token' })
        return
    }

    req.user = payload
    next()
}