const public = (req, res, next) => {
    res.json('hello from public')
}

const private = (req, res, next) => {
    res.json('hello from private')
}

const admin = (req, res, next) => {
    res.json('hello from admin')
}

module.exports = {
    public,
    private,
    admin
}