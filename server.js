'use strict';

// create a variable to use express library
const express = require('express'); // npm install express

require('dotenv').config();// npm i dotenv

// CORS: Cross Origin Resource Sharing
// to give the permission for who can send me request
const cors = require('cors');

const weatherData = require('./data/weather.json')

const server = express(); // server has all of the properties and method of express

const PORT = process.env.PORT;

server.use(cors());// make it open to any client

console.log(weatherData[0].city_name);

// localhost:3001/
server.get('/', (req, res) => {
    res.status(200).send('Welcome To home')
})





//localhost:3001/weather?&searchQuery=
server.get('/weather', (req, res) => {

    console.log(req.query);
    let selectCity = weatherData.find(item => {
        if (item.city_name == req.query.searchQuery) {
            return item
        }

    })
    let arrForecast = [];

    class Forecast {
        constructor(date, description) {
            this.date = date; //selectCity.data[0].datetime
            this.description = description;//selectCity.data[0].weather.description
        }
    }
    for (let i = 0; i <= 2; i++) {
        arrForecast.push(new Forecast(selectCity.data[i].datetime, selectCity.data[i].weather.description))
    }
     console.log(arrForecast);
    res.status(200).send(arrForecast);

    // console.log(selectCity.data[0].datetime);
})

// handle any route
// localhost:3001/ANY_ROUTE
server.get('*', (req, res) => {
    res.status(404).send('NOT FOUND')
})


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

