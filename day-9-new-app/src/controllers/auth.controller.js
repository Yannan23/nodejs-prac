const User = require('../models/user.model')

const register = async (req, res, next) => {

    const { username, password } = req.body
    const user = new User({ username, password })
    await user.save()
    res.status(201).json(user)
}

const login = async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).exec()

    if (!user) {
        res.status(401).json({ error: "Invalid credial" })
        return
    }
    if (user.password !== password) {
        res.status(401).json({ error: "Invalid credial" })
        return
    }
    res.json({ username: user.username })
}

module.exports = {
    register,
    login
}