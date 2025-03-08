const express = require('express')
const corsMiddleware = require('./middleware/cors.middleware')
const v1Router = require('./routes')
const app = express()

app.use(express.json())
app.use(corsMiddleware)

app.use('/v1', v1Router)

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})