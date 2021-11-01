const express = require('express')
const fs = require('fs')
const axios = require('axios')
const request = require('sync-request')

const app = express()

const PORT = 3000
const TIMEOUT = 100
const FILENAME = 'archivo_ejemplo.txt'

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

app.get('/request_bbox_sync', (_, res) => {
    axios.get('http://bbox:9090')
        .then(response => {
            res.send(response?.data)
        })
        .catch(err => {
            res.send(err)
        })
})

app.get('/request_bbox_async', (_, res) => {
    axios.get('http://bbox:9091')
        .then(response => {
            res.send(response?.data)
        })
        .catch(err => {
            res.send(err)
        })
})

app.get('/request_async', (_, res) => {
    axios.get('https://dog.ceo/api/breeds/image/random')
        .then(response => {
            res.send(response.data)
        })
        .catch(err => {
            res.send(err)
        })
})

app.get('/request_sync', async (_, res) => {
    try {
        const response = request('GET', 'https://dog.ceo/api/breeds/image/random')
        res.send(response.getBody('utf8'))
    } catch(err) {
        res.send(err)
    }
})

app.get('/read_file_sync', (_, res) => {
    const data = fs.readFileSync(FILENAME, { encoding: 'utf8', flag: 'r' });
    res.send(data)
})

app.get('/read_file_async', (_, res) => {
    fs.readFile(FILENAME, { encoding: 'utf8', flag: 'r' },
        (_, data) => {
            res.send(data)
        })
})

app.get('/async', function (_, res) {
    setTimeout(() => {
        res.send('Asincronico OK')
    }, TIMEOUT);
})

app.get('/heavy', function (_, res) {
    let now = new Date()

    while (new Date() - now <= TIMEOUT) {}

    res.send('Heavy OK')
})

app.listen(PORT, () => {
    console.info(`Listen on port ${PORT}`)
})