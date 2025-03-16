const { model, Schema } = require('mongoose')

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// const UserModel = model('User', schema)

// module.exports = UserModel;

module.exports = model('User', schema)
