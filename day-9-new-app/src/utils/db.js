const mongoose = require('mongoose')
const config = require('./config')
const { logger } = require('./logger.js');

const dbConnection = async () => {
    const db = mongoose.connection;

    db.on('connecting', () => {
        logger.info('Atempting to connect db')
    })

    db.on('connected', () => {
        logger.info('db is connected successfully')
    })

    db.on('disconnected', () => {
        logger.warn('db is disconnected')
    })

    db.on('error', (error) => {
        logger.error('db connection error', { payload: error });
        process.exit(1);
    })

    db.on('reconnected', () => {
        logger.info('db is reconnected')
    })
    return mongoose.connect(config.DB_CONNECTION_STRING)
}

module.exports = dbConnection