const { model, Schema } = require('mongoose')
import mongoose from '../../node_modules/mongoose/types/index.d';

const schema = new mongoose.Schema({
    userName: {
        type: string,
        required: true
    },
    password: {
        type: string,
        required: true
    }
})

// const UserModel = model('User', schema)

// module.exports = UserModel;

module.exports = model('User', schema)
