const User = require('../models/user.model')

const regester = async (req, res, next) => {
    const { userName, password } = req.body
    const user = new User({ userName, password })
    await user.save()
    res.status(201).json(user)
}

const login = (req, res, next) => {
    const { userName, password } = req.body
    const user = User.findOne({ userName }).exec()
    if (!user) {
        res.status(401).json({ error: "Invalid credial" })
        return
    }
    if (user.password !== password) {
        res.status(401).json({ error: "Invalid credial" })
        return
    }
    res.status(200).json(user)
}

module.exports = {
    regester,
    login
}