const express = require('express')
const app = express()
const TIMEOUT = 100

app.get('/', function (_, res) {
    res.send('Hello, world!')
})

app.get('/ping', function (_, res) {
    res.send('pong\n')
})

app.get('/sync', function (_, res) {
    let a = 2
    let b = 2
    let c = a + b
    res.send('Sincronico OK')
})

app.get('/async', function (_, res) {
    setTimeout(() => {
        res.send('Asincronico OK')
    }, TIMEOUT);
})

app.get('/heavy', function (_, res) {
    let now = new Date()

    while (new Date() - now <= TIMEOUT) {
    }

    res.send('Heavy OK')
})

app.listen(3000)