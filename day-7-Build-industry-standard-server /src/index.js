const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const v1Router = require('./routes')
const config = require('./utils/config')
const { logger } = require('./utils/logger')
const morganMiddleware = require('./middleware/morgan.middleware')
const ratelimiter = require('./middleware/rateLimit.middleware')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('./utils/swagger')

const app = express()

app.use(helmet())
app.use(ratelimiter)
app.use(cors())
app.use(morganMiddleware)
app.use(express.json())

app.use('/v1', v1Router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc))

app.listen(config.PORT || 3000, () => {
    logger.info(`Server is listening on port ${config.PORT}`);
})