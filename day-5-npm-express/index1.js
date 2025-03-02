// const express = require('express')
// const app = express()

// app.use(logger)

// app.get('/', (req, res) => {
//     res.send('Home Page')
// })

// app.get('/users', auth, (req, res) => {
//     console.log('users page from console');
//     res.send('Users Page')
// })


// // const logger = (req, res, next) => {
// function logger(req, res, next) {
//     console.log('log in');
//     next()
// }

// function auth(req, res, next) {
//     if (req.query.admin === 'true') {
//         next()
//     } else {
//         res.send('No auth')
//     }
// }

// app.listen(3000)


const express = require('express')

const app = express();

function middleware(req, res, next) {
    if (req.query.code === '521') {
        next()
    } else {
        res.send('暗号错误')
    }
}

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.get('/admin', middleware, (req, res) => {
    res.send('Dashboard Page')
})

app.get('/setting', middleware, (req, res) => {
    res.send('Setting Page')
})

app.listen(3000, () => {
    console.log('Server is working');
})