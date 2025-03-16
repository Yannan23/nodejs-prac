const jwt = require('jsonwebtoken')

const secret = 'secret'

const payload = {
    id: 123
}

const token = jwt.sign(payload, secret, {
    expiresIn: 1
})

const pl = jwt.verify(token, secret)
console.log(pl);

console.log(token);
