'use strict';

const express = require('express');
const server = express();
require('dotenv').config();
const cors = require('cors');
server.use(cors());
const PORT = process.env.PORT;

const moviesFun = require('./modules/movies');
const weatherFun = require('./modules/weather');

server.get('/', (req, res) => {

    res.status(200).send('Home Page')
});

server.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

server.get('/weather', weatherFun);
server.get('/movies', moviesFun);

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

