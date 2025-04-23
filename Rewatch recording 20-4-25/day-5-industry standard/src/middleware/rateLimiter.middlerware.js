const { rateLimit } = require('express-rate-limit')
const config = require('../utils/config')

const rateLimiter = rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    limit: config.RATE_LIMIT_LIMIT,
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
    skip: () => config.NODE_ENV !== 'production'
})

module.exports = rateLimiter