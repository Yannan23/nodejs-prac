const config = require('../src/utils/config')
const mongoose = require('mongoose')
const { clearDb } = require('./helper')

//lifecycle function hook
beforeAll(async () => {
    //connect to db
    await mongoose.connect(config.DB_CONNECTION_STRING)
})

beforeEach(async () => {
    //clear db
    await clearDb()
})

afterAll(async () => {
    //close db connection
    await mongoose.connection.close()
})