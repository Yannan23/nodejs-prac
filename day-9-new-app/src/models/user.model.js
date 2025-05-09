const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs');

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

schema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 12)
}

schema.methods.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

// const UserModel = model('User', schema)

// module.exports = UserModel;

module.exports = model('User', schema)
