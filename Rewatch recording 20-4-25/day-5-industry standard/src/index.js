const express = require('express')
const cors = require('cors')
const movieRouter = require('./routes/movie.router')
const v1Router = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/v1', v1Router)

app.listen(3000, () => {
    console.log('Server is running on PORT 3000');
})

