const express = require('express')
const app = express()
const config = require('./utils/config')

const cors = require('cors')
const helmet = require('helmet')
const morgon = require('../src/middleware/morgan.middleware')
const rateLimit = require('../src/middleware/rateLimit.middleware')

const { logger } = require('./utils/logger')
const v1Router = require('./routes/v1')
const dbConnection = require('./utils/db')

app.use(cors());
app.use(helmet());
app.use(morgon);
app.use(rateLimit);
app.use(express.json());
app.use('/v1', v1Router);

dbConnection();

app.get('/', (req, res) => {
    res.json('hello')
})

app.listen(config.PORT, () => {
    logger.info(`Server is running on Port ${config.PORT}`);
})