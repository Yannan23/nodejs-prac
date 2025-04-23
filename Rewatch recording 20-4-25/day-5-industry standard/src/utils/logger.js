const winston = require('winston')
const config = require('./config')
const path = require('path')

const createLogger = (fileName) => {
    const logger = winston.createLogger({
        level: config.LOG_LEVEL,
        defaultMeta: {
            fileName: fileName ? path.basename(fileName) : undefined
        },
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message, fileName, payload }) => {
                const fileInfo = fileName ? `[${fileName}]` : ''
                const payloadInfo = payload ? `\n${JSON.stringify(payload)}` : ''
                return `[${timestamp}] [${level}] ${fileInfo}: [${message}]${payloadInfo}`
            })
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: 'logs/combined.log'
            }),
            new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error'
            })
        ]
    })
    return logger
}

module.exports = {
    createLogger,
    logger: createLogger()
}