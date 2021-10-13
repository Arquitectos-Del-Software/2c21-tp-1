const express = require('express');
const app = express();
const TIMEOUT = 5000;

app.get('/ping', function (req, res) {
    res.send('pong\n');
});

app.get('/', function (req, res) {
    res.send('Hello, world!');
});

app.get('/heavy', function (req, res){
    let now = new Date();
    while(new Date()-now<= TIMEOUT);
    res.send('Hello, world!');
});

app.listen(3000);