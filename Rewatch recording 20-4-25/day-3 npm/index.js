const express = require('express')
const app = express()
app.use(express.json())

app.get('/:userId/:productId', (req, res) => {
    // res.end('hello')
    res.json({
        route: req.params.userId,
        query: req.query,
        lala: req.body
    })
})

app.listen(8000)