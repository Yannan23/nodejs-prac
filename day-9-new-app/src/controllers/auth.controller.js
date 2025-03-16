const User = require('../models/user.model')
const { generateToken } = require('../utils/jwt')

const register = async (req, res, next) => {

    const { username, password } = req.body
    const user = new User({ username, password })
    await user.hashPassword()
    await user.save()

    const token = generateToken({ id: user.id, username: user.username })
    res.status(201).json(token)
}

const login = async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).exec()
    const validPassword = await user.validatePassword(password)

    if (!user) {
        res.status(401).json({ error: "Invalid credial" })
        return
    }
    if (!validPassword) {
        res.status(401).json({ error: "Invalid credial" })
        return
    }
    const token = generateToken({ id: user.id, username: user.username, role: 'admin' })

    res.json(token)
}

module.exports = {
    register,
    login
}