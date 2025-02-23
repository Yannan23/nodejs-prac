const http = require('http');
const fs = require('fs');
const path = require('path');

const homePage = fs.readFileSync(path.join(__dirname, './home.html'));
const aboutPage = fs.readFileSync(path.join(__dirname, './about.html'))

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end(homePage)
        return
    }
    if (req.url === '/about') {
        res.end(aboutPage)
        return
    }
    res.end(JSON.stringify({ a: 1, b: 2 }))
})

server.listen('3000')
