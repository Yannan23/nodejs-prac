const express = require('express')
const movieRouter = require('./routes/movie.router')
const corsMiddleware = require('./middleware/cors.middleware')
const app = express()

app.use(express.json())
app.use(corsMiddleware)

app.use('/v1/movies', movieRouter)

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})