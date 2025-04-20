const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'counter.js'), { encoding: "utf-8" }, (err, data) => {
    if (err) {
        console.log(err);
        return
    }

    console.log(data);
})

fs.writeFileSync(path.join(__dirname, 'text.md'), 'hello')