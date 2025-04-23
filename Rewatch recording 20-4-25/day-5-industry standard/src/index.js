const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('./utils/swagger')

const movieRouter = require('./routes/movie.router')
const v1Router = require('./routes')
const config = require('./utils/config')
const { logger } = require('./utils/logger')
const morganMiddleware = require('./middleware/morgan.middleware')
const rateLimiter = require('./middleware/rateLimiter.middlerware')

const app = express()

app.use(helmet())
app.use(rateLimiter)
app.use(cors())
app.use(morganMiddleware)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc))
app.use(express.json())

app.use('/v1', v1Router)

app.listen(config.PORT, () => {
    logger.info(`Server is running on PORT ${config.PORT}`);
})

