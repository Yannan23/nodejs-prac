const { config } = require('dotenv')
const morgan = require('morgan')
const { logger } = require('../utils/logger')

module.exports = morgan(
    config.NODE_ENV === 'development' ? 'dev' : 'combined',
    {
        stream: {
            write: (message) => logger.info(message)
        }
    }
)