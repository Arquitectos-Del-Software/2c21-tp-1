const express = require('express')
const app = express()

app.get('/ping', function (req, res) {
    res.send('pong\n')
})

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)