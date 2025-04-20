const http = require('http')
const fs = require('fs')
const path = require('path')

aboutPage = fs.readFileSync(path.join(__dirname, 'about.html'))
homePage = fs.readFileSync(path.join(__dirname, 'home.html'))

const logs = []
const logFilePath = path.join(__dirname, 'logger.json')
logger = fs.readFileSync(logFilePath, 'utf-8')
logs.push(...JSON.parse(logger))

const server = http.createServer((req, res) => {
    logs.push({ time: new Date().toISOString(), path: req.url })
    fs.writeFileSync(logFilePath, JSON.stringify(logs), (e) => {
        if (e) {
            console.log('e: ', e);
            return
        }
        console.log('file saved');
    })
    if (req.url === '/') {
        res.end(homePage)
        return
    }
    if (req.url === '/about') {
        res.end(aboutPage)
        return
    }
    if (req.url === '/logs') {
        res.end(JSON.stringify(logs))
        return
    }
    res.end('fail')
})

server.listen(3000)