const fs = require('node:fs')
const path = require('path')

fs.readFile(
    path.join(__dirname, './counter.js'),
    { encoding: 'utf-8' },
    (error, data) => {
        if (error) {
            console.log('error');
            return
        }
        console.log(data);
    })

fs.writeFileSync(path.join(__dirname, 'test.txt'), 'hello')