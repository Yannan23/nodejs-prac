const http = require('http');
const fs = require('fs');
const path = require('path');

const homePage = fs.readFileSync(path.join(__dirname, './home.html'))
const aboutPage = fs.readFileSync(path.join(__dirname, './about.html'))

const logs = [];

const logsFilePath = path.join(__dirname, 'logs.json');
const logsString = fs.readFileSync(logsFilePath, 'utf-8')
logs.push(...JSON.parse(logsString))

const server = http.createServer((req, res) => {
    logs.push({ time: new Date().toDateString(), path: req.url })
    fs.writeFile(logsFilePath, JSON.stringify(logs), (error) => {
        if (error) {
            console.log('error', error);
            return
        }
        console.log('File saved');

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
    res.end('hello')
})

server.listen('8080')