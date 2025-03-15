const express = require('express')
const app = express()
const config = require('./utils/config')

const cors = require('cors')
const helmet = require('helmet')
const morgon = require('../src/middleware/morgan.middleware')
const rateLimit = require('../src/middleware/rateLimit.middleware')

const { logger } = require('./utils/logger')

app.use(cors());
app.use(helmet());
app.use(morgon);
app.use(rateLimit);
app.use(express.json());



app.get('/', (req, res) => {
    res.json('hello')
})

app.listen(config.PORT, () => {
    logger.info(`Server is running on Port ${config.PORT}`);
})