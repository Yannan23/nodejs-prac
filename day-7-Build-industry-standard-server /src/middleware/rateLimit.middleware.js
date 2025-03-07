const { rateLimit } = require('express-rate-limit')
const config = require('../utils/config')

const ratelimiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS, // 15 minutes
    limit: config.RATE_LIMIT_LIMIT, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    skip: () => config.NODE_ENV !== 'production'
})

module.exports = ratelimiter